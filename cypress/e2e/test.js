///<reference types = "Cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


describe("testjs", () => {
    it.skip('first three test cases language,contact number,currency', () => {
        cy.visit("https://www.almosafer.com/en");


        // Currency check 
        cy.get('[data-testid="Header__CurrencySelector"]').should('contain', "SAR")

        // contact check 

        cy.get('.sc-dRFtgE').should('contain', "96655440000")


        // language check 

        cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', "العربية")


    });
    it.skip('test the logo of qitaf', () => {

        cy.visit("https://www.almosafer.com/en");

        cy.get('.sc-ghsgMZ').should('be.visible')

    });

    it.skip('check hotel tab is not selected', () => {
        cy.visit("https://www.almosafer.com/en");
        cy.get('#uncontrolled-tab-example-tab-hotels').should('have.attr', 'aria-selected').and('equal', 'false')

    });

    it.skip('check the depature date and return date', () => {
        cy.visit("https://www.almosafer.com/en")

        const currenDate = new Date()
        const day = currenDate.getDate()

        const expectedForDepature = day + 1
        const expectedForReturn = day + 2

        cy.get('[data-testid="FlightSearchBox__FromDateButton"] > .sc-hcnlBt').should('contain', expectedForDepature)
        cy.get('[data-testid="FlightSearchBox__ToDateButton"] > .sc-hcnlBt').should('contain', expectedForReturn)



    });

    it.only('randomly change the language of the website and create one assertion for each change ', () => {



        const websites = ["https://www.almosafer.com/en", "https://www.almosafer.com/ar"]

        const RandomIndex = Math.floor(Math.random() * websites.length)


        console.log(RandomIndex)

        cy.visit(websites[RandomIndex])



        cy.url().then((url) => {

            let ArabicCities = ["جدة","دبي"]
            let randomArabic = Math.floor(Math.random()*ArabicCities.length)
            let englishCities = ["dubai","jeddah","riyadh"]
            let randomEnglish = Math.floor(Math.random()*englishCities.length)

            let roomVisitor = ["A","B"]

            let randomvistorNo = Math.floor(Math.random()*roomVisitor.length)

let lowestPrice = ""

let HighestPrice = ""

            if (url.includes('ar')) {


                //hard way 
                cy.get('.sc-gRnDUn').should('have.attr', 'src').and('include', "ar")


                // easy way 
                cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', "English")


                cy.get('#uncontrolled-tab-example-tab-hotels').click()
                cy.get('[data-testid="AutoCompleteInput"]').type(ArabicCities[randomArabic])
                cy.get('[data-testid="AutoCompleteResultItem0"] > .sc-12clos8-5').click()
                cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()
                cy.get('select[data-testid="HotelSearchBox__ReservationSelect_Select"]').select(roomVisitor[randomvistorNo])
                cy.get('[data-testid="HotelSearchBox__SearchButton"]')

                
                // cy.document().its('readyState').should('eq', 'complete');

                // point 8 last one 

                cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click()

                cy.get('[data-testid="HotelSearchResult__Hotel0__PriceLabel"] > .Price__Value').then((element)=>{
                    
                    lowestPrice=element.text()
                })


                
                cy.get('[data-testid="HotelSearchResult__Hotel39__PriceLabel"]').find("Price__Value").then((element)=>{

                    HighestPrice=element.text()
                    console.log(HighestPrice)

                })

            } else if (url.includes('en')) {



                //hard way 
                cy.get('.sc-gRnDUn').should('have.attr', 'src').and('include', "en")


                // easy way 
                cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', "العربية")

                cy.get('#uncontrolled-tab-example-tab-hotels').click()

                cy.get('[data-testid="AutoCompleteInput"]').type(englishCities[randomEnglish])
                cy.get('[data-testid="AutoCompleteResultItem0"] > .sc-12clos8-5').click()
                cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()
                cy.get('select[data-testid="HotelSearchBox__ReservationSelect_Select"]').select(roomVisitor[randomvistorNo])
                cy.get('[data-testid="HotelSearchBox__SearchButton"]')

                // cy.document().trigger('pageLoaded');

                // point 8 last one 

                cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click()

                cy.get('[data-testid="HotelSearchResult__Hotel0__PriceLabel"] > .Price__Value').then((element)=>{
                    
                    lowestPrice=element.text()
                })

                cy.get('[data-testid="HotelSearchResult__Hotel39__PriceLabel"]').find("Price__Value").then((element)=>{

                    HighestPrice=element.text()
                    console.log(HighestPrice)

                })

            }

        })



    }
    
  );

}



);
