import { Page, Locator } from '@playwright/test';

import { BasePage } from '../../BasePage';
import { ObjectRegistry } from '../../../src/objects/objectRegistry';

export class LoginPage extends BasePage {

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly registerLink: Locator;
    readonly errorMessage: Locator;
    readonly forgetPassword: Locator;

    constructor(page: Page, registry: ObjectRegistry) {
        //Khởi tạo phần dùng chung được định nghĩa trong BasePage
        super(page, registry);

        // Lấy locator từ Object Repository
        this.emailInput = this.getLocator('login.email');
        this.passwordInput = this.getLocator('login.password');
        this.loginButton = this.getLocator('login.loginButton');
        this.registerLink = this.getLocator('login.registerLink');
        this.forgetPassword = this.getLocator('login.forgotPasswordLink')
        this.errorMessage = this.getLocator('login.errorMessage');
    }

    // Truy cập trang đăng nhập
    async goto() {
        await this.page.goto('/login');
    }

    // Nhập email
    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }

    // Nhập mật khẩu
    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    // Nhấn nút Gửi
    async clickLogin() {
        await this.loginButton.click();
    }

    // Thực hiện đăng nhập
    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    // Điều hướng đến trang đăng ký
    async goToRegister() {
        await this.registerLink.click();
    }

    // Điều hướng đến trang quên mật khẩu
    async goToForgetPassword() {
        await this.forgetPassword.click();
    }

}
