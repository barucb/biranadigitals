// Contact.jsx
"use client";
import Footer from '@/components/footer/Footer';
import React from 'react';
import { MdOutlineMarkEmailUnread, MdOutlinePersonOutline, MdBusiness, MdMessage, MdPhone } from "react-icons/md";
import { IoBusiness } from "react-icons/io5";
import useForm from '@/utils/useForm';
// Adjust the import path based on your project structure

const InputField = (props) => {
  return (
    <div className='flex w-full'>
      <div className="relative   w-full mb-4">
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2">{props.icon}</div>
        <input
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          name={props.name}
          className="w-full whitespace-break-spaces bg-transparent rounded-lg pl-12 text-lg p-2  border-2 border-transparent border-b-[#fc7405] focus:outline-none  focus:border-3 focus:border  focus:border-[#fc7405]"
        />
      </div>
    </div>
  );
};

const Contact = () => {
  const initialState = {
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!values.company.trim()) {
      errors.company = 'Company / Business Name is required';
    }

    if (!values.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (isNaN(values.phone)) {
      errors.phone = 'Phone must be a valid number';
    }

    if (!values.message.trim()) {
      errors.message = 'Message is required';
    }

    return errors;
  };

  const { formData, errors, handleChange, handleSubmit } = useForm(initialState, validate);

  return (
    <>
      <div className='py-32 lg:py-48  flex flex-col lg:flex-row' >
        <div className='text-center lg:ml-32 lg:w-1/2  lg:text-start'>
          <p className='lg:text-9xl  text-5xl text-[#fc7405]'>
            Let's Grow Your Brand
          </p>
          <p className='lg:text-4xl text-2xl pt-5 '>
            Digitalize Your Business For a Sustained Growth.
          </p>
        </div>
        <div className='w-full lg:ml-32 justify-center pt-12 lg:pt-28 flex lg:w-[80%]  '>
          <div className='flex py-5 px-2 lg:pl-10 items-center flex-col'>
            <p className='text-2xl lg:text-4xl py-5 text-[#fc7405] font-semibold'>Start A Conversation With Us</p>
            <InputField placeholder="Name" icon={<MdOutlinePersonOutline size={36} />} onChange={handleChange} value={formData.name} name="name" />
            <InputField placeholder="Company / Business Name" icon={<MdBusiness size={36} />} onChange={handleChange} value={formData.company} name="company" />
            <InputField placeholder="Email" icon={<MdOutlineMarkEmailUnread size={36} />} onChange={handleChange} value={formData.email} name="email" />
            <InputField placeholder="Phone" icon={<MdPhone size={36} />} onChange={handleChange} value={formData.phone} name="phone" />
            <InputField placeholder="Your message" icon={<MdMessage size={36} />} onChange={handleChange} value={formData.message} name="message" />

            <div>
              <button className='p-2 px-16 text-xl hover:text-white mt-6 rounded-lg bg-[#fc7405] text-black' onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
