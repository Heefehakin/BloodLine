const bloodApplications = require("../models/blood.model");

exports.donateBlood = async (req, res) => {
    const {
      bloodGroup,
      rhesusFactor,
      hasDonatedBefore,
      address,
    } = req.body;
    try {
      if (
        !bloodGroup ||
        !rhesusFactor ||
        !hasDonatedBefore ||
        !address
      ) {
        return res
          .status(400)
          .json({ message: "Please Fill All Required Fields" });
      }
    
      //Create a new Bloodsample application
      const newApplication = new bloodApplications({
        bloodGroup,
        rhesusFactor,
        hasDonatedBefore,
        address,
      });

      //save the Bloodsample application to the database
      await newApplication.save();

      return res
      .status(201)
      .json({ message: "Blood sample Application Submitted Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

//Route to check if user has donated before
exports.hasDonatedBefore = async (req, res) => {
  try {
    const id = req.params.id;
    const bloodApplication = await bloodApplications.findById(id);

    if (!bloodApplication) {
      return res.status(404).json({ message: "Blood Application not found" });
    }
    return res.status(200).json({ hasDonatedBefore: bloodApplication.hasDonatedBefore });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

//Get all Blood samples
exports.getAll = async (req, res) => {
    try {
      const bloodApplications = await bloodApplications.find();
      return res.status(200).json({data: bloodApplications, length: bloodApplications.length});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

// Update Loan Application

exports.updateBlood = async (req, res) => {
    const {
        bloodGroup,
        rhesusFactor,
        hasDonatedBefore,
        address,
    } = req.body;
    try {
      const id = req.params.id;
      const updateApplication = await bloodApplications.findByIdAndUpdate(
        {
          _id: id,
        },
        {
            bloodGroup,
            rhesusFactor,
            hasDonatedBefore,
            address,
        },
        {
          New: true,
        }
      );
  
      if (!updateApplication) {
        return res.status(404).json({ message: "Blood Application not found" });
      }
  
      return res
        .status(200)
        .json({ message: "Blood Application Updated Successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

  // Route to delete blood sample information
  exports.deleteBlood = async (req, res) => {
    try {
      await bloodApplications.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Blood Samples deleted successfully"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };
