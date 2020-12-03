const address =
{
  rule: {
    address: {
      type: "object",
      properties: {
        number: { type: "number" },
        street_name: { type: "string" },
      },
    },
  },
};


const schema = {
  listing: { unique: true, type: Number },
  header: {
    sale: Boolean,
    pending: Boolean,
    new: Boolean,
    construction: Boolean,
  },
  address: { unique: true, type: String },
  price: Number,
  bed: Number,
  bath: Number,
  images: Array,
}