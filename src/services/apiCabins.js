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

  // Supabase will create folders when detecting slash and we don't want it
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabine_images/${imageName}`;

  // 1. Create a new cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Could not create cabin`);
  }

  // 2. Upload cabin image
  const { error: imageError } = await supabase.storage
    .from("cabine_images")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  // 3. Delete the cabin if the image failed to upload
  if (imageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(imageError);
    throw new Error(
      `Image could not be uploaded due to the failure of cabin creation`
    );
  }

  return data;
}

export async function updateCabin(updatedCabin) {
  const { id, image: imageToCheckType, ...cabinData } = updatedCabin;
  let image = imageToCheckType;

  if (typeof imageToCheckType !== "string") {
    image = imageToCheckType[0];
  }
  console.log(image);
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Could not delete cabin ${id}`);
  }
}
