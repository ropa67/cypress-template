describe("Search test suite", () => {
    it("should search songs", () => {
      const authHeader = "Basic ";
  
      const options = {
        method: "POST",
        url: "",
        form: true,
        body: {
          grant_type: "client_credentials"
        },
        headers: {
          Authorization: authHeader
        }
      };
  
      cy.request(options).then(resp => {
        localStorage.setItem("token", resp.body.access_token);
      });
  
      cy.visit("http://localhost:3000");
    });
  });