/**
 * SignUp.jsx - User Registration Component
 * Handles user registration with form validation, image upload, and API integration
 */

import React from "react";
import { VStack, Field, Input, Button } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const navigate = useNavigate();

  const postDetails = (pics) => {
    setLoading(true);
    if (pic === undefined) {
      toaster.create({
        description: "Please select an image",
        type: "error",
        duration: 5000,
        closable: true,
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chat-App");
      data.append("cloud_name", "digkz2jkz");
      fetch("https://api.cloudinary.com/v1_1/digkz2jkz/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          // console.log("Image uploaded successfully", data.url.toString());
          toaster.create({
            description: "Image uploaded successfully",
            type: "success",
            duration: 5000,
            closable: true,
          });
          setLoading(false);
        })
        .catch((error) => {
          // console.error("Error uploading image:", error);
          toaster.create({
            description: "Error uploading image",
            type: "error",
            duration: 5000,
            closable: true,
          });
          setLoading(false);
        });
    } else {
      toaster.create({
        description: "Please select an image",
        type: "error",
        duration: 5000,
        closable: true,
      });
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toaster.create({
        description: "Please fill all the fields",
        type: "warning",
        duration: 5000,
        closable: true,
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toaster.create({
        description: "Passwords do not match",
        type: "warning",
        duration: 5000,
        closable: true,
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = pic
        ? { name, email, password, pic }
        : { name, email, password };
      const { data } = await api.post("/user/signup", body, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      // console.error("Error occurred during registration:", error);
      toaster.create({
        description: "Error occurred during registration",
        type: "error",
        duration: 5000,
        closable: true,
      });
      setLoading(false);
    }
  };

  return (
    <VStack gap="20px">
      <Field.Root required>
        <Field.Label>
          Name
          <Field.RequiredIndicator />
        </Field.Label>
        <Input
          placeholder="Your Full Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          Email
          <Field.RequiredIndicator />
        </Field.Label>
        <Input
          placeholder="youremail@exampledomain.com"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          Password
          <Field.RequiredIndicator />
        </Field.Label>
        <PasswordInput
          placeholder="•••••••••••"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          visible={visible}
          onVisibleChange={setVisible}
          visibilityIcon={{
            on: (
              <span className="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="eye-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              </span>
            ),
            off: (
              <span className="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="eye-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                </svg>
              </span>
            ),
          }}
        />
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          Confirm Password
          <Field.RequiredIndicator />
        </Field.Label>
        <PasswordInput
          placeholder="•••••••••••"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
          visible={visible2}
          onVisibleChange={setVisible2}
          visibilityIcon={{
            on: (
              <span className="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="eye-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              </span>
            ),
            off: (
              <span className="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="eye-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                </svg>
              </span>
            ),
          }}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>Upload Your Image</Field.Label>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(event) => {
            postDetails(event.target.files[0]);
          }}
        />
      </Field.Root>
      <Button
        colorPalette="blue"
        width="100%"
        style={{ marginTop: 5 }}
        onClick={submitHandler}
        loading={loading}
        loadingText="Processing..."
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
