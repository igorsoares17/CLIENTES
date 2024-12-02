class Utils {

    static dateFormat(date) {

        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    static getNumber(data) {

        let array = data.split("v");
        let number = parseInt(array[0]);
        return number + 10;
    }

    static getHeight(number) {

        let height = number.toString() + "vh";
        return height;
    }
}