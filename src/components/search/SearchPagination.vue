<script setup>
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/index.js";
import ButtonText from "@/components/buttons/ButtonText.vue";

const props = defineProps(["criteria", "category", "field"]);
const userStore = useUserStore();
const page = ref(0);
const pages = ref(userStore.searchResults.get(props.category).get(props.field).at(1));

const next = async () => {
  if (page.value < pages.value - 1) {
    page.value++;
    await paginate();
  }
};

const previous = async () => {
  if (page.value > 0) {
    page.value--;
    await paginate();
  }
};

const paginate = async () => {
  const apiData = (
    await axios.get(`${import.meta.env.VITE_HOST}/api/v1/user/search/${props.category}/${props.field}/${page.value}`, {
      headers: { Authorization: `Bearer ${userStore.idToken}` },
      params: {
        igdbAccessToken: userStore.igdbAccessToken,
        spotifyAccessToken: userStore.spotifyAccessToken,
        criteria: props.criteria,
      },
    })
  ).data;

  userStore.searchResults.get(props.category).get(props.field)[2] = apiData;
};
</script>

<template>
  <div class="search-pagination-container">
    <ButtonText @click="previous()">Previous</ButtonText>
    <p>{{ `Page ${page + 1} of ${pages}` }}</p>
    <ButtonText @click="next()">Next</ButtonText>
  </div>
</template>

<style lang="scss" scoped>
.search-pagination-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  p {
    font-weight: 700;
    font-size: 1.25rem;
    color: $lightBlue;
  }
}
</style>
