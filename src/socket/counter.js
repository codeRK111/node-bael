export default class adminDetails {
    constructor() {
        this.adminCount = 0;
        this.userCount = 0;
    }

    increaseAdmin = () => {
        this.adminCount = this.adminCount + 1
    }

    decreaseAdmin = () => {
        this.adminCount = this.adminCount - 1
    }

    increaseUserCount = () => {
        this.userCount = this.userCount + 1
    }

    decreaseUserCount = () => {
        this.userCount = this.userCount - 1
    }
}
