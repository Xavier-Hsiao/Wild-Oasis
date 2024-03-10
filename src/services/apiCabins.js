import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Could not load cabins data");
  }

  return data;
}

export async function createCabin(newCabin) {
  // https://wzxnyemusgtrrgzqcjtg.supabase.co/storage/v1/object/public/cabine_images/cabin-001.jpg
  const { image, ...cabinData } = newCabin;
  const { imageName, imagePath } = await uploadImage(image);

  // Create a new cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabinData, image: imagePath }])
    .select()
    .single();

  if (error) {
    const { error: deleteImageError } = await supabase.storage
      .from("cabine_images")
      .remove([imageName]);
    if (deleteImageError) {
      console.error(deleteImageError);
      throw new Error("Delete image failed", deleteImageError.message);
    }
    console.error(error);
    throw new Error("Could not create cabin", error.message);
  }

  return data;
}

export async function updateCabin(updatedCabin) {
  const { id, image: imageToCheckType, ...cabinData } = updatedCabin;
  let image = imageToCheckType;

  // Newly uploaded image type will be file list
  if (typeof imageToCheckType !== "string") {
    const { imagePath } = await uploadImage(image[0]);
    image = imagePath;
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabinData, image })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin update failed");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Could not delete cabin ${id}`);
  }
}

export async function uploadImage(image) {
  // Supabase will create folders when detecting slash and we don't want it
  const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabine_images/${imageName}`;
  const { error } = await supabase.storage
    .from("cabine_images")
    .upload(imageName, image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error("Upload image failed");
  }

  return { imageName, imagePath };
}
