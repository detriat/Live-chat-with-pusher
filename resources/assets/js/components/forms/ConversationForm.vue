<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            New message
        </div>
        <div class="panel-body">
            <form action="#" @submit.prevent="send">

                <div class="form-group relative">
                    <input type="text"
                           placeholder="Start typing to find users"
                           class="form-control"
                           v-model="soughtUser"
                    >

                    <ul v-if="searchResults.length" class="list-autocomplete">
                        <li v-for="user in searchResults" :key="user.id" @click="addRecipient(user)">
                            {{ user.name }}
                        </li>
                    </ul>
                </div>

                <ul v-if="recipients.length" class="list-inline">
                    <li><strong>To:</strong></li>
                    <li v-for="recipient in recipients">
                        {{ recipient.name }} [<a href="#" @click.prevent="removeRecipient(recipient)">x</a>]
                    </li>
                </ul>

                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" cols="30" rows="4" class="form-control" v-model="body"></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-default">Send</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data() {
            return {
                soughtUser: '',
                searchResults: [],
                body: null,
                recipients: [],
            }
        },

        watch: {
            soughtUser() {
                if (this.soughtUser.length < 3) {
                    return;
                }

                axios.get('/webapi/soughtUsers', {
                    params: {
                        name: this.soughtUser
                    }
                }).then(res => this.searchResults = res.data);
            }
        },

        methods: {
            ...mapActions([
                'createConversation'
            ]),

            addRecipient(recipient) {
                const existing = this.recipients.find(r => r.id === recipient.id);

                if (typeof existing !== 'undefined') {
                    return;
                }

                this.recipients.push(recipient);
                this.soughtUser = '';
                this.searchResults = [];
            },

            removeRecipient(recipient) {
                this.recipients = this.recipients.filter(r => r.id !== recipient.id);
            },

            send() {

                this.createConversation({
                    body: this.body,
                    recipientIds: this.recipients.map(recipient => recipient.id),
                })
                    .then(() => {
                        this.recipients = [];
                        this.body = null;
                    });
            }
        }
    }
</script>

<style scoped>
    .relative {
        position: relative;
    }

    .list-autocomplete {
        position: absolute;
        padding: 0;
        list-style: none;
        background: #fff;
        width: 100%;
    }

    .list-autocomplete li {
        padding: 5px 10px;
        border-bottom: 1px solid #d9edf7;
        cursor: pointer;
    }

    .list-autocomplete li:hover {
        background: #d9edf7;
        transition: background 0.3s linear;
    }
</style>