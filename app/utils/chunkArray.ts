
export default function chunk(array: any[], chunkSize: number) {
    const numItems = array.length;
    const numChunks = Math.ceil(numItems / chunkSize);
    const initializer: any[] = [];
    for (let i = 1; i <= numChunks; i ++) {
        initializer.push([])
    }
    let chunkIndex: number = 0;

    return array.reduce((acc: typeof initializer, curr: any, index: number) => {
        if (index !== 0 && index % chunkSize === 0 && chunkIndex < numChunks - 1) chunkIndex ++;
        acc[chunkIndex].push(curr);
        return acc;
    }, initializer)
}