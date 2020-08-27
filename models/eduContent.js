const mongoose = require("mongoose");

const eduContentSchema = new mongoose.Schema({
        class: String,
        question: String,
        categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
        subcategory: String,
        tags: Array,
        text: String
  });

  const EduContent = mongoose.model('EduContent', eduContentSchema);

  module.exports = EduContent;
