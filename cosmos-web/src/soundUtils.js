export const playGong = (count = 1) => {
    const gongUrl = '/singing-bowl-gong-69238.mp3';

    const playOne = (num) => {
        const audio = new Audio(gongUrl);
        audio.currentTime = 0;
        audio.play().catch(e => console.error("Gong playback error:", e));

        if (num < count) {
            setTimeout(() => playOne(num + 1), 3500); // 3.5s interval between gongs
        }
    };

    playOne(1);
};
