function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    // if (!pageId) {
    //     const params = new URLSearchParams(window.location.search);
    //     pageId = params.get("pageid");
    // }

    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.remove("hidden");
        } else {
            page.classList.add("hidden");
        }
    });


    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
}