/// <reference types="cypress"/>
describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

    it("Fill all the text input fields", () => {
        const firstName = "João";
        const lastName = "Vasconcelos";
        var x = firstName.length;
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("joao.vasconcelos.cps@gmail.com");
        cy.get("#requests").type("V");
        cy.get("#signature").type(`${firstName} ${lastName}`);

        cy.get("#first-name").should("contain.value", "João");
        cy.get("#requests").should("not.contain.value","carne");
        //cy.expect(x).to.be.greaterThan(2).to.be.lessThan(500);
        //cy.expect("#first-name").to.have.length.of.at.most(2);
        cy.get("#email").should("have.value","joao.vasconcelos.cps@gmail.com");
        cy.get("#last-name").should("not.have.value", "");
        
    });

    it("Select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
        cy.get("#ticket-quantity").should("have.value", "2");
    });

    it("Select VIP ticket type", () =>{
        cy.get("#vip").check();
        cy.get(".agreement p").should("contain", "VIP");
        
    });

    it("Selects Social-Media checkbox", () => {
        cy.get("#social-media").check();
    });

    it("Selects Friend, and publication, then uncheck Friend", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();

        cy.get("#friend").should("be.not.checked","#friend")
        cy.get("#publication").should("be.checked","#publication")
        cy.get("#social-media").should("be.not.checked","#social-media")

        cy.get("#friend").check();
        cy.get("#social-media").check();

        cy.get("#friend").should("be.checked","#friend")
        cy.get("#social-media").should("be.checked","#social-media")
    });

    it("has 'TICKETBOX' header's heading", () => { 
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("Alerts on invalid email", () => {
        cy.get("#email")
            .as("email")
            .type("teste-gmail.com");

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
            .clear()
            .type("teste@gmail.com");

            cy.get("#email.invalid").should("not.exist");
    });

    it("Fill and reset the form", () =>{
        const firstName = "João Vitor";
        const lastName = "Vasconcelos";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("joao.vasconcelos.cps@gmail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("teste");

        cy.get(".agreement p").should("contain",`I, ${fullName}, wish to buy 2 VIP tickets.`);

        cy.get("#agree").click();
        cy.get("#signature").type(`${fullName}`);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");
        
        cy.get("button[type='reset']").click();
        cy.get("@submitButton").should("be.disabled");

    })

    it("Fills mandatory fields using support command", () =>{
        const customer = {
            firstName: "João",
            lastName: "Silva",
            email: "joao.silva@example.com",
        };

        cy.fillMandatoryFileds(customer);
        
        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");
        
        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");
    });
});