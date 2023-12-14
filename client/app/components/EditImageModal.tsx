"use client";

import { UploadCloudIcon, X } from "lucide-react";
import ReactDOM from "react-dom";
import { useEffect, useState, useMemo, forwardRef } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { useEdgeStore } from "@/lib/edgeStore";

const variants = {
  base: "relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-gray-300 transition-colors duration-200 ease-in-out",
  image:
    "border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-900 rounded-md",
  active: "border-2",
  disabled: "bg-gray-700 cursor-default pointer-events-none bg-opacity-30",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

type InputProps = {
  width: number;
  height: number;
  className?: string;
  value?: File | string;
  onChange?: (url: string) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
  onClose: () => void;
  onMutation: (url: string) => void;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return "Invalid file type.";
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return "The file is not supported.";
  },
};

const EditImageModal = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      dropzoneOptions,
      width,
      height,
      value,
      className,
      disabled,
      onChange,
      onClose,
      onMutation,
    },
    ref,
  ) => {
    const imageUrl = useMemo(() => {
      if (typeof value === "string") {
        // in case a url is passed in, use it to display the image
        return value;
      } else if (value) {
        // in case a file is passed in, create a base64 url to display the image
        return URL.createObjectURL(value);
      }
      return null;
    }, [value]);

    const { edgestore } = useEdgeStore();
    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      disabled,
      onDrop: async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          const response = await edgestore.publicImages.upload({ file });
          onMutation(response.url);
        }
      },
      ...dropzoneOptions,
    });
    const modalRoot = document.getElementById("modal-root") as HTMLElement;
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    // styling
    const dropZoneClassName = useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          imageUrl && variants.image,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className,
        ).trim(),
      [
        isFocused,
        imageUrl,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ],
    );
    // error validation messages
    const errorMessage = useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === "file-too-large") {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === "file-invalid-type") {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === "too-many-files") {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return ReactDOM.createPortal(
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 gap-4"
        onClick={onClose}
      >
        <div className="bg-gradient-to-br from-crd to-crd2 p-4 rounded-lg shadow-xl gap-4">
          <div
            {...getRootProps({
              className: dropZoneClassName,
              style: {
                width,
                height,
              },
            })}
          >
            {/* Main File Input */}
            <input ref={ref} {...getInputProps()} />

            {imageUrl ? (
              // Image Preview
              <img
                className="h-full w-full rounded-md object-cover"
                src={imageUrl}
                alt={acceptedFiles[0]?.name}
              />
            ) : (
              // Upload Icon
              <div className="flex flex-col items-center justify-center text-xs text-gray-400">
                <UploadCloudIcon className="mb-2 h-7 w-7" />
                <div className="text-gray-400">drag & drop to upload</div>
                <div className="mt-3">
                  <Button disabled={disabled}>select</Button>
                </div>
              </div>
            )}

            {/* Remove Image Icon */}
            {imageUrl && !disabled && (
              <div
                className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
                onClick={(e) => {
                  e.stopPropagation();
                  void onChange?.("");
                }}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-white/70 bg-black transition-all duration-300 hover:h-6 hover:w-6">
                  <X className="text-white/70" width={16} height={16} />
                </div>
              </div>
            )}
          </div>

          {/* Error Text */}
          <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
        </div>
      </div>,
      modalRoot,
    );
  },
);
EditImageModal.displayName = "EditImageModal";

const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={twMerge(
        // base
        "focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
        // color
        "border border-gray-600 bg-violet-500 text-gray-100 shadow hover:bg-violet-600",
        // size
        "h-6 rounded-md px-2 text-xs",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return "0 Bytes";
  }
  bytes = Number(bytes);
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default EditImageModal;
