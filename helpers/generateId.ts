import connectDatabase from "@/src/config/mongodbConnection";

export async function generateUniqueID(Model: any, key: string, StartingName: string): Promise<string> {
  await connectDatabase();
  const previousItems = await Model.find({});

  // Extract the numeric part of the IDs and find the maximum number
  const rememberPreviousItemCodes = previousItems.map((item) => item[key]);
  const maxNumber = rememberPreviousItemCodes.reduce((max: number, id: string) => {
    const num = parseInt(id.replace(StartingName, ""), 10);
    return num > max ? num : max;
  }, 0);

  // Increment the maximum number by 1
  let nextNumber = maxNumber + 1;
  let newID = `${StartingName}${nextNumber.toString().padStart(3, "0")}`;

  // Check for ID duplicates
  while (rememberPreviousItemCodes.includes(newID)) {
    nextNumber += 1;
    newID = `${StartingName}${nextNumber.toString().padStart(3, "0")}`;
  }

  return newID;
}
