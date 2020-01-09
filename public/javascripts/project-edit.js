//Find project edit form
	let projectEditForm = document.getElementById('projectEditForm');
	//Add submit listener to project edit form
	projectEditForm.addEventListener('submit', function(even) {
		//find length of uploaded images
		let imageUploads = document.getElementById('imageUpload').files.length;
		//find total number of existing images
		let existingImages = document.querySelectorAll('.imageDeleteCheckbox').length;
		//find total number of potential images
		let imageDeletions = document.querySelectorAll('.imageDeleteCheckbox:checked').length;
		//Figure out if the form can be submitted or not
		let newTotal = existingImages - imageDeletions + imageUploads;
		if( newTotal >4) {
			event.preventDefault();
			let removalAmt = newTotal - 4;
			alert(`You need to remove ${removalAmt} more image${removalAmt === 1? '' : 's'}!`);
		}
	})