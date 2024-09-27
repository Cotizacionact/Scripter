<div >
    <div class="text-center text-2xl font-bold">Create a Blog Post</div>
    <form method="POST">
        <div class="flex flex-col p-2">
            <label for="Title">Title</label>
            <input class="border rounded p-2" type="text" name="Title" id="Title" placeholder="Title"/>
        </div>
        <div class="flex flex-col p-2">
            <label for="Body">Body</label>
            <textarea class="border rounded p-2" name="Body" id="Body" placeholder="Your text goes here"/>
        </div>
        <div class="flex flex-col p-2">
            <label for="Cover">Cover Image</label>
            <input type="file" id="Cover" name="Cover" />
        </div>
        <button type="submit" class="m-2 bg-green-500 text-white p-2 rounded w-full">Submit</button>
    </form>

</div>