const openItem = (item) => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__content");
    const textBlock = contentBlock.find(".team__content-block");
    const reqHeight = textBlock.height();

    container.addClass("team__active");
    contentBlock.height(reqHeight);
}

const CloseEveryItem = (container) => {
    const items = container.find(".team__content");
    const itemContainer = container.find(".team__item");

    itemContainer.removeClass("team__active");
    items.height(0);
};

$(".team__item__title").click((e) => {
    const $this = $(e.currentTarget);
    const container = $this.closest(".team");
    const elemContainer = $this.closest(".team__item");

    if (elemContainer.hasClass("team__active")) {
        CloseEveryItem(container);
    } else {
        CloseEveryItem(container);
        openItem($this);
    }
})