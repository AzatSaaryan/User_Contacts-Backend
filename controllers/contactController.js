const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@description Get all contacts
//@route Get /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@description Create New contact
//@route Post /api/contacts
//@access private
const createContacts = asyncHandler(async (req, res) => {
  console.log("req body: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});
//@description Update contact
//@route Put /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update other user's contact"
    );
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@description Get contact
//@route Get /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});
//@description Delete contact
//@route Delete /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to delete other user's contact"
    );
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Contact removed successfuly " });
});
//@description Delete all contacts
//@route Delete /api/contacts/
//@access private
const deleteAllContacts = asyncHandler(async (req, res) => {
  await Contact.deleteMany();
  res.status(200).json({ message: "All contacts removed successfuly " });
});

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
};
