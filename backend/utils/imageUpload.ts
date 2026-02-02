import { v2 as cloudinary } from 'cloudinary';

export interface IImageUploadOptions {
  folder: string;
  format: 'jpg' | 'png' | 'webp' | 'avif';
}

export async function initCloudinary(): Promise<void> {
  const cloudinary = (await import('cloudinary')).v2;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
}

export async function uploadImage(
  fileBuffer: Buffer,
  options: IImageUploadOptions
): Promise<{ url: string; publicId: string }> {
  try {
    const cloudinary = (await import('cloudinary')).v2;

    const result = await cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        format: options.format,
        transformation: [
          { width: 1200, height: 800, crop: 'fill' },
          { quality: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          throw error;
        }
        return result;
      }
    );

    // Convert buffer to stream
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        format: options.format,
        transformation: [
          { width: 1200, height: 800, crop: 'fill' },
          { quality: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          throw error;
        }
        return result;
      }
    );

    // Wait for the upload to complete
    return new Promise((resolve, reject) => {
      stream.on('finish', (result: any) => {
        resolve({
          url: result.secure_url,
          publicId: result.public_id
        });
      });
      stream.on('error', reject);
      stream.end(fileBuffer);
    });
  } catch (error) {
    throw new Error(`Image upload failed: ${error}`);
  }
}

export async function deleteImage(publicId: string): Promise<void> {
  try {
    const cloudinary = (await import('cloudinary')).v2;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error(`Image deletion failed: ${error}`);
  }
}