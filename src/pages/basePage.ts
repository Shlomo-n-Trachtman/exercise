import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
    constructor(protected page: Page) {}

    // Navbar
    readonly navbar = this.page.locator('#nava');
    readonly navbarElements = {
        navbarx: this.navbar.locator('#narvbarx'),
        navbarButton: this.navbar.locator('button.navbar-toggler[data-target="#navbarExample"][aria-label="Toggle navigation"]'),
        homeLink: this.page.locator('a.nav-link:has-text("Home")'),
        contactLink: this.page.locator('a.nav-link:has-text("Contact")'),
        aboutUsLink: this.page.locator('a.nav-link:has-text("About us")'),
        cartLink: this.page.locator('a.nav-link:has-text("Cart")'),
        loginLink: this.page.locator('a.nav-link:has-text("Log in")'),
        signUpLink: this.page.locator('a.nav-link:has-text("Sign up")'),
        logoutLink: this.navbar.locator('a#logout2'),
        userNameLink: this.navbar.locator('a#nameofuser')
    };


    // Model for the modals section
    private modalsContainer = this.page.locator('.modal');
    

    // Example Modal
    readonly exampleModal = this.page.locator('#exampleModal');
    readonly exampleModalElements = {
        title: this.exampleModal.locator('.modal-title'),
        closeButton: this.exampleModal.locator('.close'),
        emailLabel: this.exampleModal.locator('label[for="recipient-email"]'),
        emailInput: this.exampleModal.locator('#recipient-email'),
        nameLabel: this.exampleModal.locator('label[for="recipient-name"]'),
        nameInput: this.exampleModal.locator('#recipient-name'),
        messageLabel: this.exampleModal.locator('label[for="message-text"]'),
        messageTextArea: this.exampleModal.locator('#message-text'),
        closeModalButton: this.exampleModal.locator('button.btn.btn-secondary'),
        sendMessageButton: this.exampleModal.locator('button.btn.btn-primary:has-text("Send message")')
    };

    // Sign In Modal
    readonly signInModal = this.page.locator('#signInModal');
    readonly signInModalElements = {
        title: this.signInModal.locator('.modal-title'),
        closeButton: this.signInModal.locator('.close'),
        usernameLabel: this.signInModal.locator('label[for="sign-username"]'),
        usernameInput: this.signInModal.locator('#sign-username'),
        passwordLabel: this.signInModal.locator('label[for="sign-password"]'),
        passwordInput: this.signInModal.locator('#sign-password'),
        errorLabel: this.signInModal.locator('label#errors'),
        closeModalButton: this.signInModal.locator('button.btn.btn-secondary'),
        signUpButton: this.signInModal.locator('button.btn.btn-primary[onclick="register()"]'),
    };

    // Log In Modal
    readonly logInModal = this.page.locator('#logInModal');
    private logInModalElements = {
        title: this.logInModal.locator('.modal-title'),
        closeButton: this.logInModal.locator('.close'),
        usernameLabel: this.logInModal.locator('label[for="loginusername"]'),
        usernameInput: this.logInModal.locator('#loginusername'),
        passwordLabel: this.logInModal.locator('label[for="loginpassword"]'),
        passwordInput: this.logInModal.locator('#loginpassword'),
        errorLabel: this.logInModal.locator('label#errorl'),
        closeModalButton: this.logInModal.locator('button.btn.btn-secondary'),
        logInButton: this.logInModal.locator('button.btn.btn-primary[onclick="logIn()"]'),
    };
    

    // Video Modal
    readonly videoModal = this.page.locator('#videoModal');

        // Modal Header for About Us Modal
    private aboutUsModalHeader = this.page.locator('.modal-header');
    private aboutUsModalHeaderElements = {
        title: this.aboutUsModalHeader.locator('h5.modal-title#videoModalLabel'),
        closeButton: this.aboutUsModalHeader.locator('button.close[aria-label="Close"]'),
        closeButtonIcon: this.aboutUsModalHeader.locator('button.close span[aria-hidden="true"]'),
    };

        // Locator for the close button icon (X symbol) inside a span
    private closeButtonIcon = this.page.locator('span[aria-hidden="true"]');

        // Locator for the play video button and its elements
    private playVideoButton = this.page.locator('button.vjs-big-play-button[title="Play Video"]');
    private playVideoButtonElements = {
        iconPlaceholder: this.playVideoButton.locator('span.vjs-icon-placeholder[aria-hidden="true"]'),
        controlText: this.playVideoButton.locator('span.vjs-control-text[aria-live="polite"]')
    };

        // Locator for the close button in modal
    private modalCloseButton = this.page.locator('button.btn.btn-secondary[data-dismiss="modal"]');






    // Footer
    private footer = this.page.locator('#footc');
    private footerElements = {
        aboutUsSection: this.footer.locator('div#fotcont .col-sm-4').nth(0),
        aboutUsHeader: this.footer.locator('div#fotcont .col-sm-4').nth(0).locator('h4.grrrr'),
        aboutUsText: this.footer.locator('div#fotcont .col-sm-4').nth(0).locator('p'),

        getInTouchSection: this.footer.locator('div#fotcont .col-sm-3'),
        getInTouchHeader: this.footer.locator('div#fotcont .col-sm-3').locator('h4.grrrr'),
        getInTouchAddress: this.footer.locator('div#fotcont .col-sm-3').locator('p').nth(0),
        getInTouchPhone: this.footer.locator('div#fotcont .col-sm-3').locator('p').nth(1),
        getInTouchEmail: this.footer.locator('div#fotcont .col-sm-3').locator('p').nth(2),

        productStoreSection: this.footer.locator('div#fotcont .col-sm-4').nth(1),
        productStoreHeader: this.footer.locator('div#fotcont .col-sm-4').nth(1).locator('h4 img'),
    };

    //Methods
    public abstract navigate(url: string): Promise<void>;
    public abstract validateUrl(url: string): Promise<void>;
}