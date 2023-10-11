const Package = require('../Models/Package');

// Get a list of all health packages (Not Required in Sprint 1 but will be needed in upcoming sprints)
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve packages' });
  }
};

// Create a new health package
const createPackage = async (req, res) => {
  try {
    const packageData = req.body;
    const newPackage = new Package(packageData);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(500).json({ error: 'Could not create the package' });
  }
};

// Update a health package by name
const updatePackage = async (req, res) => {
  const { name } = req.params;
  const packageData = req.body;

  try {
    const updatedPackage = await Package.findOneAndUpdate({ name }, packageData, {
      new: true,
    });

    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).json({ error: 'Could not update the package' });
  }
};

// Delete a health package by name
const deletePackage = async (req, res) => {
  const { name } = req.params;

  try {
    const deletedPackage = await Package.findOneAndDelete({ name });

    if (!deletedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.status(204).send(); // Successful deletion (no content sent)
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the package' });
  }
};

module.exports = {
  getAllPackages,
  createPackage,
  updatePackage,
  deletePackage,
};
