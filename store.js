import {reactive} from "vue";
/* import {api} from "./api"; */
export const store = reactive ({
    selectedRestaurant: 0,
    foodsList: [],
    order: [],
});