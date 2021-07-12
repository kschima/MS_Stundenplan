<template>
    <div>
        <BookingsOverview/>
        <RoomsOverview/>
    </div>
</template>

<script>

import BookingsOverview from "./BookingsOverview.vue";
import RoomsOverview from "./RoomsOverview.vue"
export default {
  components: { BookingsOverview, RoomsOverview },
  data: () => ({

  }),

  methods: {

  }
};
</script>