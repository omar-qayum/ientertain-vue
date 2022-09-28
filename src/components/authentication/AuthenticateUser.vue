<script setup>
import { useUserStore } from "@/store/index.js";

const props = defineProps(["mode", "user", "plan"]);
const userStore = useUserStore();

const authenticateUser = async () => {
  if (props.mode === "register") {
    await userStore.register(props.user, props.plan);
  } else {
    await userStore.login(props.user);
  }
};

await authenticateUser();
</script>
<style lang="scss" scoped></style>
