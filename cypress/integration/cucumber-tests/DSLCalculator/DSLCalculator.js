import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import {HOMEPAGE_DSL_TAB,HOMEPAGE_DSL_PREFIX_FIELD, 
    HOMEPAGE_DSL_SPEED_FIELD,HOMEPAGE_DSL_SUBMIT_BTN} from "../../ObjectRepo/HomePageLocators.js"
import {TARIFFSPAGE_DETAILS_FIRST_AVAILABILITY_BTN, TARIFFSPAGE_DETAILS_TARIFF_TITLE,
    TARIFFSPAGE_DETAILS_PRICE, TARIFFSPAGE_DETAILS_PROVIDER_NAME,TARIFFSPAGE_DETAILS_EFFECTIVE_PRICE_TOOLTIP
, TARIFFSPAGE_DETAILS_TARIFF_PRICE_DETAILS_TITLE, 
TARIFFSPAGE_DETAILS_TARIFF_PRICE_COST_AFTER_24_MONTHS} from "../../ObjectRepo/TarrifDetailsPageLocators.js"
import {TARIFFSPAGE_RESULTS_BLOCK,TARIFFSPAGE_RESULTS_MOREBTN} from "../../ObjectRepo/TarrifResultsPageLocators.js"

var resultsURl = '';
var tarrifResultsCount = 0;

Given('the User is on {string}',(url)=>{
    cy.visit(url);
});

When('he is on the DSL calculator',()=>{
    cy.get(HOMEPAGE_DSL_TAB).click();
});

And('he enters prefix or code Ihre Vorwahl as {string} with {string} bandwidth selection',(prefix,speed)=>{
    cy.xpath(HOMEPAGE_DSL_PREFIX_FIELD).type(prefix);
    cy.xpath('//*[contains(@id,"'+HOMEPAGE_DSL_SPEED_FIELD+'-'+speed+'")]').first().click({ force: true });
});

And('clicks on the button labeled as JETZT VERGLEICHEN',()=>{
    cy.xpath(HOMEPAGE_DSL_SUBMIT_BTN).click();
});

Then('he should be able see the Result List page with all the available Tariffs',()=>{
    cy.title().should('include','DSL-Preisvergleich aller DSL-Anbieter in Deutschland');
});

Given('the User is on the DSL Result List',()=>{
    cy.location().then((loc) => {
        console.log("result "+ loc.toString())
        if(loc.toString().includes('vergleich')==false){
            cy.visit(resultsURl);
        }
        else{
            resultsURl = loc.toString();
        }
    })
  });

Given('clicks on {string} button for any listed tariff',(buttonLabel)=>{
    cy.contains(buttonLabel).first().click();
})

Then('he should be able see the details of the selected Tariff',()=>{
    cy.get(TARIFFSPAGE_DETAILS_FIRST_AVAILABILITY_BTN).should('be.visible');
})

And('he should also see a button labeled as {string}',(buttonText)=>{
    cy.get(TARIFFSPAGE_DETAILS_FIRST_AVAILABILITY_BTN)
    .then($els => {
      const win = $els[0].ownerDocument.defaultView
      const before = win.getComputedStyle($els[0], 'before')
      const contentValue = before.getPropertyValue('content')
      expect(contentValue).to.eq(buttonText)
    })
})

And('he should find the tariff price',()=>{
    cy.get(TARIFFSPAGE_DETAILS_PRICE).should('be.visible');
})

And('he should find the tariff title',()=>{
    cy.xpath(TARIFFSPAGE_DETAILS_TARIFF_TITLE).should('be.visible');
})

And('he should find the tariff provider name',()=>{
    cy.get(TARIFFSPAGE_DETAILS_PROVIDER_NAME).should('be.visible');
})

And('he should find the effective price tooltip labeled as {string}',(priceTootTip)=>{
    cy.get(TARIFFSPAGE_DETAILS_EFFECTIVE_PRICE_TOOLTIP).first().invoke('text').should('include',priceTootTip);
})

And('he should find the price details title labeled as {string}',(priceDetailsTitle)=>{
    cy.get(TARIFFSPAGE_DETAILS_TARIFF_PRICE_DETAILS_TITLE).invoke('text').should('include',priceDetailsTitle);
})

And('he should find the after twenty four months details label contain {string} text',(label)=>{
    cy.get(TARIFFSPAGE_DETAILS_TARIFF_PRICE_COST_AFTER_24_MONTHS).first().invoke('text').should('include',label);
})

When('there are more than {int} tariffs available for the provided Vorwahl and bandwidth',(numberOfItems)=>{
    tarrifResultsCount += numberOfItems;
    cy.xpath(TARIFFSPAGE_RESULTS_BLOCK).should('have.length',numberOfItems)
})

Then('the User should a button labeled as {string}',(moreBtnText)=>{
    cy.xpath(TARIFFSPAGE_RESULTS_MOREBTN).invoke('text').should('include',moreBtnText)
})

And('When he or she clicks on this button',()=>{
    cy.xpath(TARIFFSPAGE_RESULTS_MOREBTN).click()
})

Then('the list should be appended with next {int} tariffs and so on until all Tariffs are loaded',(numberOfItems)=>{
    tarrifResultsCount+= numberOfItems;
    cy.xpath(TARIFFSPAGE_RESULTS_BLOCK).should('have.length',tarrifResultsCount)
})