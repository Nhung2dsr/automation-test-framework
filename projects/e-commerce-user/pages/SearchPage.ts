import { BasePage } from "../../BasePage";

export class SearchPage extends BasePage {

    async Search(keyword: string): Promise<void>{
        await this.page.goto('/');

        await this.getLocator('search.keywordInput').fill(keyword);

        await this.getLocator('search.searchButton').click();
    }

    // Lấy tên các sản phẩm trong trang kết quả hiện tại
    async getProductNames(): Promise<string[]> {
        return this.getLocator('search.productNames').allTextContents();
    }

    // Lấy tên sản phẩm ở trang danh sách hoặc trang chi tiết
    async getSearchResultNames(): Promise<string[]> {

        // Nếu đang ở trang chi tiết sản phẩm
        if (this.page.url().includes('/product/')) {
            const name = await this.getLocator('search.productDetailTitle').innerText();
            return [name.trim()];
        }

        // Nếu đang ở trang danh sách sản phẩm
        return this.getProductNames();
    }

    // Đếm sản phẩm trên trang kết quả hiện tại
    async getProductCount(): Promise<number> {
        return this.getLocator('search.productCards').count();
    }

    // Lấy thông báo tổng số kết quả
    async getResultCountText(): Promise<string> {
        return (await this.getLocator('search.resultCount').innerText()).trim();   
    }
}