export async function generateSlug({ Model, filedName, value }) {
    const findSlug = await Model.findOne({ [filedName]: value });

    const modify = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters except hyphens
        .replace(/\-\-+/g, "-"); // Replace multiple hyphens with a single hyphen

    return findSlug ? `${modify}-${Math.floor(Math.random() * 100)}` : modify;
}