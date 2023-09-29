// Library.spec.ts
import React from "react";
import { mount } from "@cypress/react";

import Library from "../../../src/sections/Home/Library/Library";

describe("Library Component", () => {
  const mockHandleDelete = cy.stub();
  const mockHandleVideo = cy.stub();
  const mockVideoRefs = { current: { "test-video": null } };

  const isPlayingMock = {
    "test-video": false,
  };

  beforeEach(() => {
    window.localStorage.setItem("userId", "1"); // mocking localStorage userId
    window.localStorage.setItem("token", "validtoken"); // mocking localStorage token

    cy.request("GET", "http://localhost:4000/users").then((response) => {
      const videos = response.body; // replace 'response.body' with the actual path to videos in the response

      // Mounting the component to the DOM using the mount function from @cypress/react
      mount(
        <Library
          videos={videos}
          handleDelete={mockHandleDelete}
          handleVideo={mockHandleVideo}
          videoRefs={mockVideoRefs}
          isPlaying={isPlayingMock}
        />
      );
    });
  });

  it("renders the video name", () => {
    cy.contains("test-video").should("exist");
  });

  it("plays video on play button click", () => {
    cy.get('button[data-testid="play-button"]').click();
    cy.wrap(mockHandleVideo).should("have.been.calledOnceWith", "test-video");
  });

  it("deletes video on delete button click", () => {
    cy.get('button[data-testid="delete-button"]').click();
    cy.wrap(mockHandleDelete).should("have.been.calledOnceWith", "test-video");
  });
});
