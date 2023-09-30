import BaseRepository from "../../repository/base.repository";
import Todo, { ITodo } from "./todos.model";

class TodoRepository extends BaseRepository<ITodo> {
  constructor() {
    super(Todo);
  }
}

export default new TodoRepository();
