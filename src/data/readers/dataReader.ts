export interface DataReader<T> {
    read(filePath: string): T;
}