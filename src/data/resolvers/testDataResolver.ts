import type { TestDataRow } from '../loaders/testDataLoader';

export class TestDataResolver {
    // Tìm các biến ${variable} trong chuỗi
    private readonly variablePattern = /\$\{([^{}]+)\}/g;

    // Kiểm tra toàn bộ giá trị có phải một biến không
    private readonly exactPattern = /^\$\{([^{}]+)\}$/;

    // Thay placeholder bằng giá trị thực tế
    resolve(value: unknown, data: TestDataRow): unknown {
        // Giữ nguyên giá trị không phải string
        if (typeof value !== 'string') {
            return value;
        }

        // Trường hợp toàn bộ value là một biến
        const exactMatch = this.exactPattern.exec(value);

        if (exactMatch) {
            return this.getValue(exactMatch[1]!, data);
        }

        // Trường hợp biến nằm trong chuỗi
        return value.replace( this.variablePattern, (_, key: string) => {
            const resolved = this.getValue(key, data);

            if ( resolved !== null && typeof resolved === 'object') {
                throw new Error(`Cannot interpolate object variable: ${key}`);
            }

            return String(resolved);
        });
    }

    // Lấy dữ liệu và báo lỗi nếu biến không tồn tại
    private getValue(key: string, data: TestDataRow): unknown {

        if (!Object.prototype.hasOwnProperty.call(data, key)) {
            throw new Error(`Test data variable not found: ${key}`);
        }

        return data[key];
    }
}
