import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_API_KEY');

async function uploadImage(image: File , bucket:String ): Promise<string> {
    try {
        
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(`${bucket}/${image.name}`, image);

        if (error) {
            throw new Error(error.message);
        }

     
        const imagePath = data?.Key;

        if (!imagePath) {
            throw new Error('Failed to get the path of the uploaded image');
        }

        return imagePath;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}
