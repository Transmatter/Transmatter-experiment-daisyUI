<script>
import MenuItem from './MenuItem.vue';
import ProfileButton from './ProfileButton.vue';
import Login from "@/service/LoginAPI.js";

export default {
    components : {
        MenuItem,
        ProfileButton
    },
    methods:{
        mockLogout(){
            Login.logout();
        },
        seeDetail(){
            this.$router.push(`/admin/${this.$store.getters.getCurrentUser.id}`);
            this.$store.state.trigger = false
        },
        updateDetail(){
            this.$router.push(`/update/${this.$store.getters.getCurrentUser.id}`);
            this.$store.state.trigger = false
        }
    } 
}
</script>
<template>
    <!-- <div class="block">
        <div class="ml-4 flex items-center md:ml-6">
            <div class="ml-3 relative">
                <div class="relative inline-block text-left">
                    <div>
                        <ProfileButton /> 
                        {{$store.getters.getCurrentUser.username}}
                    </div>
                    <div
                        v-if="this.$store.state.trigger"
                        class="
                            origin-top-right
                            absolute
                            right-0
                            mt-2
                            w-56
                            rounded-md
                            shadow-lg
                            bg-slate-50
                            ring-1 ring-black ring-opacity-5
                        "
                    >
                        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <MenuItem @click="seeDetail" content="Account"/>                            
                            <MenuItem @click="updateDetail" content="Update"/>                            
                            <MenuItem @click="mockLogout" content="Logout"/>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div class="dropdown dropdown-hover dropdown-end">
        <ProfileButton /> 
        {{$store.getters.getCurrentUser.username}}
        <ul tabindex="0" class="dropdown-content menu shadow bg-base-100 rounded-box w-52">
            <li><MenuItem @click="seeDetail" content="Account"/></li>                             
            <li><MenuItem @click="updateDetail" content="Update"/></li>
            <li><MenuItem @click="mockLogout" content="Logout"/></li>
        </ul>
    </div>
</template>