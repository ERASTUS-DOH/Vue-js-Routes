<template>
  <section>
    <h2>{{ teamName }}</h2>
    <button @click="routeBack"> back </button>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go To Team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users','teams'],
  props: ['teamId'],
  components: {
    UserItem
  },
  data() {
    return {
      teamName: "",
      members: [],
    };
  },
  created(){
    this.loadTeamMembers(this.teamId);
    console.log(this.$route.query)
  },
  methods: {
    routeBack(){
      this.$router.go(-1);
    },

    loadTeamMembers(teamId){
      this.$route.params
      const selectedTeam = this.teams.find(team => team.id === teamId);
      const Tmembers = selectedTeam.members;
      const selectedTeamMembers = [];
      for (const member of Tmembers){
        const user = this.users.find(user => user.id === member);
        selectedTeamMembers.push(user);
      }
      this.teamName = selectedTeam.name;
      this.members = selectedTeamMembers;
    }
  },
  watch: {
    teamId(newValueteamId){
      this.loadTeamMembers(newValueteamId);
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>