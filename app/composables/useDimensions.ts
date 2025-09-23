export function useDimensions() {
    const width = ref(0);
    const height = ref(0);

    onMounted(() => {
        console.log('useDimensions', PI, calculateCircleArea(10));
    })

    return { width, height };
}