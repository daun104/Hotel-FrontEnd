import React from "react";

// Main Card wrapper
const card = ({ children, className }) => (
  <div className={`rounded-lg shadow p-4 bg-white ${className || ""}`}>{children}</div>
);

// Card Header
const cardHeader = ({ children, className }) => (
  <div className={`mb-2 ${className || ""}`}>{children}</div>
);

// Card Content
const cardContent = ({ children, className }) => (
  <div className={`text-sm text-gray-700 ${className || ""}`}>{children}</div>
);

// Card Title
const cardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-semibold ${className || ""}`}>{children}</h3>
);

// Card Description
const cardDescription = ({ children, className }) => (
  <p className={`text-gray-500 text-sm ${className || ""}`}>{children}</p>
);

export { card, cardHeader, cardContent, cardTitle, cardDescription };
