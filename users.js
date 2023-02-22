import userbase from "https://sdk.userbase.com/2/userbase.js";

userbase
                .init({ appId: "04df42d1-d27a-4022-a89d-c0cceabb8765" })
                .then((session) => (session.user ? showTodos(session.user) : showAuth()))
                .catch(() => showAuth())
                .finally(() => (document.getElementById("loading-view").style.display = "none"));

            function handleLogin(e) {
                e.preventDefault();

                const username = document.getElementById("login-username").value;
                const password = document.getElementById("login-password").value;

                userbase
                    .signIn({ username, password, rememberMe: "local" })
                    .then((user) => showTodos(user))
                    .catch((e) => (document.getElementById("login-error").innerHTML = e));
            }

            function handleSignUp(e) {
                e.preventDefault();

                const username = document.getElementById("signup-username").value;
                const password = document.getElementById("signup-password").value;

                userbase
                    .signUp({ username, password, rememberMe: "local" })
                    .then((user) => showTodos(user))
                    .catch((e) => (document.getElementById("signup-error").innerHTML = e));
            }

            function handleLogout() {
                userbase
                    .signOut()
                    .then(() => showAuth())
                    .catch((e) => (document.getElementById("logout-error").innerText = e));
            }

            function showTodos(user) {
                document.getElementById("auth-view").style.display = "none";
                document.getElementById("todo-view").style.display = "block";

                // reset the todos view
                document.getElementById("username").innerHTML = user.username;
                document.getElementById("todos").innerText = "";
                document.getElementById("db-loading").style.display = "block";
                document.getElementById("db-error").innerText = "";

                userbase.openDatabase({ databaseName: "todos", changeHandler }).catch((e) => (document.getElementById("db-error").innerText = e));
            }

            function showAuth() {
                document.getElementById("todo-view").style.display = "none";
                document.getElementById("auth-view").style.display = "block";
                document.getElementById("login-username").value = "";
                document.getElementById("login-password").value = "";
                document.getElementById("login-error").innerText = "";
                document.getElementById("signup-username").value = "";
                document.getElementById("signup-password").value = "";
                document.getElementById("signup-error").innerText = "";
            }

            function changeHandler(items) {
                document.getElementById("db-loading").style.display = "none";

                const todosList = document.getElementById("todos");

                if (items.length === 0) {
                    todosList.innerText = "Empty";
                } else {
                    // clear the list
                    todosList.innerHTML = "";

                    // render all the to-do items
                    for (let i = 0; i < items.length; i++) {
                        // build the todo delete button
                        const todoDelete = document.createElement("button");
                        todoDelete.innerHTML = "X";
                        todoDelete.style.display = "inline-block";
                        todoDelete.onclick = () => {
                            userbase.deleteItem({ databaseName: "todos", itemId: items[i].itemId }).catch((e) => (document.getElementById("add-todo-error").innerHTML = e));
                        };

                        // build the todo checkbox
                        const todoBox = document.createElement("input");
                        todoBox.type = "checkbox";
                        todoBox.id = items[i].itemId;
                        todoBox.checked = items[i].item.complete ? true : false;
                        todoBox.onclick = (e) => {
                            e.preventDefault();
                            userbase
                                .updateItem({
                                    databaseName: "todos",
                                    itemId: items[i].itemId,
                                    item: {
                                        todo: items[i].item.todo,
                                        complete: !items[i].item.complete,
                                    },
                                })
                                .catch((e) => (document.getElementById("add-todo-error").innerHTML = e));
                        };

                        // build the todo label
                        const todoLabel = document.createElement("label");
                        todoLabel.innerHTML = items[i].item.todo;
                        todoLabel.style.textDecoration = items[i].item.complete ? "line-through" : "none";

                        // append the todo item to the list
                        const todoItem = document.createElement("div");
                        todoItem.appendChild(todoDelete);
                        todoItem.appendChild(todoBox);
                        todoItem.appendChild(todoLabel);
                        todosList.appendChild(todoItem);
                    }
                }
            }

            function addTodoHandler(e) {
                e.preventDefault();

                const todo = document.getElementById("add-todo").value;

                userbase
                    .insertItem({ databaseName: "todos", item: { todo: todo } })
                    .then(() => (document.getElementById("add-todo").value = ""))
                    .catch((e) => (document.getElementById("add-todo-error").innerHTML = e));
            }

            document.getElementById("login-form").addEventListener("submit", handleLogin);
            document.getElementById("signup-form").addEventListener("submit", handleSignUp);
            document.getElementById("add-todo-form").addEventListener("submit", addTodoHandler);
            document.getElementById("logout-button").addEventListener("click", handleLogout);

            document.getElementById("todo-view").style.display = "none";
            document.getElementById("auth-view").style.display = "none";