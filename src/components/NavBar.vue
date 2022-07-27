<script>
import LinkButton from '@/widget/LinkButton.vue';
import ProfileIcon from '@/widget/ProfileIcon.vue';
import Buttom from '@/widget/Buttom.vue';
export default {
    components: {
        LinkButton,
        ProfileIcon,
        Buttom
    },
    methods:{
        mockLogin(){
            this.$router.push('/login');
        },
        mockRegister(){
            this.$router.push('/register');
        }
    } 
};
</script>
<template>
    <div>
        <nav class="bg-white shadow">
            <div class="max-w-7xl mx-auto px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <a class="flex-shrink-0" href="/">
                            <h1 class="text-primary text-xl font-bold normal-case">
                                Transmatter Platform 
                                <sup class="text-xs" v-if="this.$store.getters.getRole == 'ROLE_ADMIN'">
                                    Admin
                                </sup>
                                <sup class="text-xs" v-if="this.$store.getters.getRole == 'ROLE_SUPER_ADMIN'">
                                    SAdmin
                                </sup>
                            </h1>
                        </a>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <span v-if="this.$store.getters.getRole == 'ROLE_SUPER_ADMIN'">
                                    <LinkButton path="Home"/>
                                    <LinkButton path="Wating List" />
                                    <LinkButton path="News Without Alt" />
                                    <LinkButton path="Local Fetching" />
                                    <LinkButton path="Inter Fetching" />
                                    <LinkButton path="About"/>
                                </span>
                                <span v-else-if="this.$store.getters.getRole == 'ROLE_ADMIN' && this.$store.getters.getStatus == 'VERIFIED'">
                                    <LinkButton path="Home"/>
                                    <LinkButton path="News Without Alt" />
                                    <LinkButton path="About"/>
                                </span>
                                <span v-else>
                                    <LinkButton path="Home"/>
                                    <LinkButton path="About"/>
                                </span>
                            </div>
                        </div>
                    </div>
                    <ProfileIcon v-if="this.$store.getters.getCurrentUser != null"/>
                    <span v-else>
                        <Buttom class="mx-2" @click="mockRegister" buttonName="Sign up"/>
                        <Buttom class="mx-2" @click="mockLogin" buttonName="Sign in"/>
                    </span>
                </div>
            </div>
            <div class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <LinkButton path="Home"/>
                    <LinkButton path="About"/>
                </div>
            </div>
        </nav>
    </div>
</template>