const Specialty = require('../models/Specialty');

// @desc Fetch all specialties
// @route GET /api/specialties
const getSpecialties = async (req, res) => {
  const specialties = await Specialty.find({});
  res.json(specialties);
};

// @desc Create a specialty
// @route POST /api/specialties
const createSpecialty = async (req, res) => {
  const { name, image, description, path } = req.body;
  const specialty = new Specialty({ name, image, description, path });
  const createdSpecialty = await specialty.save();
  res.status(201).json(createdSpecialty);
};

// @desc Update a specialty
// @route PUT /api/specialties/:id
const updateSpecialty = async (req, res) => {
  const { name, image, description, path } = req.body;
  const specialty = await Specialty.findById(req.params.id);

  if (specialty) {
    specialty.name = name;
    specialty.image = image;
    specialty.description = description;
    specialty.path = path;

    const updatedSpecialty = await specialty.save();
    res.json(updatedSpecialty);
  } else {
    res.status(404).json({ message: 'Specialty not found' });
  }
};

// @desc Delete a specialty
// @route DELETE /api/specialties/:id
const deleteSpecialty = async (req, res) => {
  const specialty = await Specialty.findById(req.params.id);
  if (specialty) {
    await specialty.deleteOne();
    res.json({ message: 'Specialty removed' });
  } else {
    res.status(404).json({ message: 'Specialty not found' });
  }
};

module.exports = { getSpecialties, createSpecialty, updateSpecialty, deleteSpecialty };
