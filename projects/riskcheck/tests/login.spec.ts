import path from 'path';
import { test, expect } from '../fixtures/login.fixture';
import { TestDataLoader } from '../../../src/data/loaders/testDataLoader';

const dataPath = path.resolve(
    process.cwd(),
    'projects/riskcheck/testdata/login.data.csv'
);

const testData = new TestDataLoader().load(dataPath);

function getTestData(id: string) {
    const row = testData.find(
        row => String(row.id ?? '').trim() === id
    );

    if (!row) {
        throw new Error(`Test data not found: ${id}`);
    }

    return {
        email: String(row.email ?? ''),
        password: String(row.password ?? ''),
        expectedResult: String(row.expectedResult ?? '').trim(),
        expectedMessage: String(row.expectedMessage ?? '')
    };
}


test.describe('RiskCheck - Login', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    // Nhóm đăng nhập thành công
    test.describe('Successful Login', () => {

        test('Login_01 - Đăng nhập thành công', async ({page, loginPage}) => {
            const data = getTestData('Login_01');

            await loginPage.login(data.email,data.password);

            await expect(page).not.toHaveURL(/\/login\/?$/);

            await expect(page.getByText(data.expectedMessage, { exact: true })).toBeVisible();
        });
    });

    // Nhóm đăng nhập thất bại
    test.describe('Unsuccessful Login', () => {

        test('Login_02 - Bỏ trống email', async ({ loginPage }) => {
            const data = getTestData('Login_02');

            await loginPage.login(data.email, data.password);

            const isMissing = await loginPage.emailInput.evaluate((input: HTMLInputElement) =>input.validity.valueMissing);

            expect(isMissing).toBe(true);
        });

        test('Login_03 - Bỏ trống mật khẩu', async ({ page, loginPage }) => {
            const data = getTestData('Login_03');

            await loginPage.login(data.email, data.password);

            // Kiểm tra mật khẩu thực sự rỗng
            await expect(loginPage.passwordInput).toBeEmpty();

            // Kiểm tra HTML5 required validation
            const validation = await loginPage.passwordInput.evaluate(
                (input: HTMLInputElement) => ({
                    required: input.required,
                    valueMissing: input.validity.valueMissing,
                    valid: input.validity.valid
                })
            );

            expect(validation.required).toBe(true);
            expect(validation.valueMissing).toBe(true);
            expect(validation.valid).toBe(false);

            // Không được chuyển khỏi trang đăng nhập
            await expect(page).toHaveURL(/\/login\/?$/);
        });

        test('Login_04 - Email chưa đăng ký', async ({ loginPage }) => {
            const data = getTestData('Login_04');

            await loginPage.login(data.email, data.password);

            await expect(loginPage.errorMessage).toContainText(data.expectedMessage);
        });

        test('Login_05 - Sai mật khẩu', async ({ page, loginPage }) => {
            const data = getTestData('Login_05');

            await loginPage.enterEmail(data.email);
            await loginPage.enterPassword(data.password);

            // Xác minh dữ liệu trước khi submit
            await expect(loginPage.emailInput).toHaveValue(data.email);
            await expect(loginPage.passwordInput).toHaveValue(data.password);

            await loginPage.clickLogin();

            // Xác minh thông báo lỗi
            await expect(loginPage.errorMessage).toBeVisible();

            await expect(loginPage.errorMessage).toContainText(data.expectedMessage);

            // Đăng nhập thất bại, vẫn ở trang login
            await expect(page).toHaveURL(/\/login\/?$/);
        });

        test('Login_07 - Email sai định dạng', async ({ page, loginPage }) => {
            const data = getTestData('Login_07');

            await loginPage.enterEmail(data.email);
            await loginPage.enterPassword(data.password);

            // Kiểm tra email thực tế trước khi submit
            await expect(loginPage.emailInput).toHaveValue(data.email);

            await loginPage.clickLogin();

            // Kiểm tra HTML5 email validation
            const validation = await loginPage.emailInput.evaluate(
                (input: HTMLInputElement) => ({
                    type: input.type,
                    typeMismatch: input.validity.typeMismatch,
                    valid: input.validity.valid
                })
            );

            expect(validation.type).toBe('email');
            expect(validation.typeMismatch).toBe(true);
            expect(validation.valid).toBe(false);

            // Không được chuyển khỏi trang đăng nhập
            await expect(page).toHaveURL(/\/login\/?$/);
        });

        
    });

    // Nhóm điều hướng
    test.describe('Login Navigation', () => {

        test('Login_06 - Điều hướng đăng ký', async ({ page, loginPage }) => {
            const data = getTestData('Login_06');

            await loginPage.goToRegister();

            await expect(page).toHaveURL(
                new RegExp(`${data.expectedMessage}/?$`)
            );
        });
    });
});