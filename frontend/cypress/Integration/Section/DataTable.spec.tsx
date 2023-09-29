// DataTable.spec.ts
import React from "react";
import { mount } from "@cypress/react";
import DataTable from "../../../src/sections/Home/Library/DataTable";

describe("DataTable Component", () => {
  const videoMock = [
    {
      title: "test-video-1",
      date: "2023-06-29",
    },
    {
      title: "test-video-2",
      date: "2023-06-28",
    },
  ];

  const rows = [
    { name: "John Doe", date: "2023-06-22" },
    { name: "Jane Doe", date: "2023-06-21" },
    // Add more data here...
  ];
 
  beforeEach(() => {
    // Mounting the component to the DOM using the mount function from @cypress/react
    mount(<DataTable rows={rows} videos={videoMock} />);
  });

  it("renders the video titles", () => {
    cy.contains("test-video-1").should("exist");
    cy.contains("test-video-2").should("exist");
  });

  it("renders the video dates", () => {
    cy.contains("2023-06-29").should("exist");
    cy.contains("2023-06-28").should("exist");
  });
});
