document.addEventListener('DOMContentLoaded', () => {

    const blogList = document.getElementById('blog-list');

    fetch('/blogs')
        .then(response => response.json())
        .then(data => {
            data.forEach(blog => {
                const blogItem = blogFormatter(blog);
                blogList.appendChild(blogItem);
            });
        }).catch(error => {
        console.error(error);
    });

    // Use event delegation on the blog list
    blogList.addEventListener('click', (event) => {
        if (event.target.classList.contains('show-blog')) {
            const blogId = event.target.closest('.blog-item').id;
            window.location.href = `/blog/${blogId}`;
        }
    });


    blogList.addEventListener('click', (event) => {
       if (event.target.classList.contains('deleteBlog')) {
           const deleteButton = event.target;
           const bookElement = deleteButton.closest('li');
           const bookId = bookElement.id

           deleteBlog(bookId)
               .then(() => {
                   console.log('BLOG deleted successfully');
                   bookElement.remove();
               })
               .catch(error => {
                   console.error('Error deleting Blog:', error);
               });
       }
    })

});



function blogFormatter(blog) {
    const blogItem = document.createElement('li');
    blogItem.classList.add('blog-item');
    blogItem.classList.add('box');
    blogItem.id = blog.id;
    blogItem.innerHTML = `
        <h2 class="title is-4">${blog.title}</h2>
        <p>${blog.content}</p>
        <br>
        <a href="/blog/${blog.id}" class="button is-primary show-blog">Read more</a>
        <a class="button is-danger deleteBlog">Delete</a>
    `;
    return blogItem;
}


function deleteBlog(id) {
    return fetch(`/blog/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id})
    }).then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Blog DELETED Successfully")
    })

}