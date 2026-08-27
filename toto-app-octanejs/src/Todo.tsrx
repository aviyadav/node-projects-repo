import { useState, useEffect } from "octane";

export function Todo() @{
    const [todos, setTodos] = useState<string[]>([
        "Buy a car",
        "Write script",
        "Record demo",
        "Buy coffee",
    ]);

    const [query, setQuery] = useState("");

    const visible = todos.filter(
        (todo) => todo.toLowerCase().includes(query.toLowerCase()),
    );

    useEffect(() => {
        document.title = `You have ${visible.length} todos`;
    });

    <div>
        <input
            value={query}
            onInput={(e) => setQuery(e.currentTarget.value)}
            placeholder="Filter..."
        ></input>

        @if (query) {
            <p
                class="status"
            >{`Showing ${visible.length} of ${todos.length} todos`}</p>
        } @else {
                <p class="status">{`${todos.length} todos total`}</p>
        }
        
        <ul>
            @for (const todo of visible; key todo) {
                <li
                    class={{ highlight: todo.toLowerCase().includes("buy") }}
                >{todo}</li>
            }
        </ul>

        <style>
            .highlight {
                background-color: #fff59d;
                color: #1a1a1a;
                padding: 0 2px;
                border-radius: 2px;
            }
        </style>
    </div>
}