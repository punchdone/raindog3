

// Toggle line order form
// $('.toggle-edit-line-form').on('click', function() {
// 	// toggle the edit button text on click
// 	$(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
// 	// toggle visibility of the edit room form
// 	$(this).siblings('.edit-line-form').toggle();
// });

// $('.toggle-new-subline-form').on('click', function() {
// 	// toggle the edit button text on click
// 	$(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
// 	// toggle visibility of the edit room form
// 	$(this).siblings('.new-subline-form').toggle();
// });

// $('.toggle-edit-subline-form').on('click', function() {
// 	// toggle the edit button text on click
// 	$(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
// 	// toggle visibility of the edit room form
// 	$(this).siblings('.edit-subline-form').toggle();
// });

// Toggle add notes form
$('#toggle-note').on('click', function() {
	$(this).text() === 'Edit' ? $(this).text('Note') : $(this).text('Cancel');
	$('.add-notes-row').toggle();
});

$('.toggle-mod-note').on('click', function() {
	$(this).text() === 'Note' ? $(this).text('Cancel') : $(this).text('Note');
	$(this).closest('tr').next().toggle();
});

//Toggle Add Mod
$('#orderLinesTable').on('click', '.toggle-mod', function(e) {
	$(this).text() === "Accessory/Mod" ? $(this).text('Cancel') : $(this).text('Accessory/Mod');
	$modAdd = $(this).closest('tr').nextUntil('.add-mod').last().next();
	$modAdd.toggle();
	// if($modAdd.next().find('.subline-note') {
	//    console.log('Subline notes = ' + $modAdd.next().find('.subline-note'));
	// });
});

//Add Line
	$('#add-cab-form').submit(function(e) {
		e.preventDefault();
		
		var line = $(this).serialize();
		console.log(line);
		
		// var productList = `${products}`;
		// console.log(productList);
		var projectId = `${order.project}`;
		var roomId = `${order.room}`;
		var orderId = `${order._id}`;
		var url = '/projects/' + projectId + '/rooms/' + roomId + '/orders/' + orderId +'/lines';
		console.log(url);
		
		$('#add-cab-form').each(function() {
			this.reset();
		});
		
		$.post(url, line, function(data) {
			console.log(data);
			console.log(data.notes);
			var availableMods = data.product.mods;
			var len = availableMods.length;
			var select = `<select name="product" class="product-select">`;
			for( var i = 0; i < len; i++) {
				console.log('Available mod = ' + data.product.mods[i]._id);
				var option = data.product.mods[i]._id;
				select = select += '<option value="' + option +'">' + data.product.mods[i].cabtype.code + data.product.mods[i].configuration + '-' + data.product.mods[i].title + '</option>';
			};
			select = select += '</select>';
			console.log(select);
			console.log(products);
			var productLen = products.length;
			var productSelect = '<select name"product" class="product-select">';
			for(var i = 0; i < productLen; i++) {
				productSelect = productSelect += '<option value="' + products[i]._id +'">' + products[i].cabtype.code + products[i].configuration + '-' + products[i].title + '</option>';
			}
			productSelect = productSelect += '</select>';
			console.log(productSelect);
			updateUrl = url + '/' + `${data._id}`;
			var editLines = `
				<tr class="edit-cabinet-row">
					<td>
						${data.product.cabtype.code}${data.product.configuration}<br>
						ProductId: <span>${data.product._id}</span>
							` + productSelect + `
					</td>
					<td></td>
					<td><input type="number" id="inputQuantity" name="quantity" step="1" required value=${data.quantity} ></td>
					<td>
						${data.hinging}
						<select name="hinging" class="inputHinge" >
							<option default></option>
							<option value="L">Left</option>
							<option value="R">Right</option>
						</select>
					</td>
					<td>
						${data.fin_left}
						<select name="fin_left" class="inputFEL">
							<option value="UN">Unfinished</option>
							<option value="FE">Finished</option>
							<option value="AP">Applied Panel</option>
							<option value="AD">Applied Door</option>
							<option value="PL">Panelized end</option>
						</select>
					</td>
					<td>
						${data.fin_right}
						<select name="fin_right" class="inputFER" value="<%= line.fin_right %>">
							<option value="UN">Unfinished</option>
							<option value="FE">Finished</option>
							<option value="AP">Applied Panel</option>
							<option value="AD">Applied Door</option>
							<option value="PL">Panelized end</option>
						</select>
					</td>
					<td><input id="inputWidth" type="number" name="width" step="0.25" required value=${data.width}></td>
					<td><input id="inputHeight" type="number" name="height" step="0.25" required value=${data.height} ></td>
					<td><input id="inputDepth" type="number" name="depth" step="0.25" required value=${data.depth} ></td>
					<td></td>
					<td>
						<form action=` + updateUrl + ` id="edit-line-form" class="edit-line-form" method="POST">
							<button class="btn btn-primary mb-1">Update Line</button>
						</form>
					</td>
				</tr>
				<tr class="edit-notes-row">
					<td></td>
					<td>Notes:</td>
					<td colspan="7">
						<textarea name="notes" id="inputNote" cols="65" >${data.notes}</textarea>
					</td>
					<td colspan="2"></td>
				</tr>
				<tr class="add-mod">
					<td><i>Modification/Accessory:</i><br>lineId: <span class="lineId">${data._id}</span></td>
					<td>
						Available Mods:<br>
						` + select + `
					</td>
					<td><input type="number" id="inputModQuantity" name="quantity" step="1" required /></td>
					<td></td>
					<td></td>
					<td></td>
					<td><input id="inputModWidth" type="number" name="width" step="0.25" required /></td>
					<td><input id="inputModHeight" type="number" name="height" step="0.25" required /></td>
					<td><input id="inputModDepth" type="number" name="depth" step="0.25" required /></td>
					<td></td>
					<td>
						<form class="add-mod-form" id="add-mod-form" name="add-mod-form" action="/projects/<%= projectDetails[0]._id %>/rooms/<%= roomId %>/orders/<%= orderId %>/lines/<%= line.id %>/sublines" method="POST">
							<button type="submit" class="btn btn-primary mb-1">Add</button>
						</form>
						<button type="button" class="toggle-mod-note btn btn-primary">Note</button>
					</td>
				</tr>
				<tr class="add-mod-note">
					<td></td>
					<td>Note:</td>
					<td colspan="7"><textarea name="notes" id="inputModNote" cols="65"></textarea></td>
					<td colspan="2"></td>
				</tr>
			`;
			if(!data.notes) {
				console.log('There are no notes!');
				var notes = "<tr class=\"note-line\"></tr>";
			} else {
				console.log('This is the note: ' + data.notes);
				var notes = `
					<tr class="note-line">
						<td></td>
						<td>Notes:</td>
						<td colspan="7">${data.notes}</td>
						<td colspan="2"></td>
					</tr>
				`
			};
			var newLine = `<tr class="cabinet-line">
					<td>
						${data.product.cabtype.code}${data.product.configuration}<br>
						LineId: <span class='lineId'>${data._id}</span><br>
						ProductId: <span class='productId'>${data.product._id}</span><br>
						Jquery Add
					</td>
					<td>${data.product.title}</td>
					<td>${data.quantity}</td>
					<td>${data.hinging}</td>
					<td>${data.fin_left}</td>
					<td>${data.fin_right}</td>
					<td>${data.width}</td>
					<td>${data.height}</td>
					<td>${data.depth}</td>
					<td></td>
					<td>
						<button type="button" class="btn btn-primary mb-1 edit-button">Edit</button>
						<form class="delete-line-form" id="delete-line-form" name="delete-line-form" action=` + updateUrl + ` method="POST">
							<button type="submit" class="btn btn-primary mb-1">Delete</button>
						</form>
						<button type="button" class="toggle-mod btn btn-primary">Accessory/Mod</button>
					</td>
				</tr>
				` + notes + editLines;
			$(newLine).insertBefore('#add-cab-form');
		});
	});
	
//Edit Line Toggle
$('#orderLinesTable').on('click', '.edit-button', function(e) {
	// var notes = $(this).closest('tr').next('.note-line').find('.notes').html();
	// if(!notes){
	// 	$editLine = $(this).closest('tr').next();
	// 	$notesLine = $(this).closest('tr').next().next();
	// } else {
	// 	$editLine = $(this).closest('tr').next().next();
	// 	$notesLine = $(this).closest('tr').next().next().next();
	// };
	$editLine = $(this).closest('tr').next().next();
	$notesLine = $(this).closest('tr').next().next().next();

	$editLine.toggle('slow');
	$notesLine.toggle('slow');
	// $editLine = $(this).closest('tr').next('.edit-cabinet-row');
	// $notesLine = $(this).closest('tr').next('.edit-notes-row');
	// $editLine.toggle('slow');
	// $notesLine.toggle('slow');
	
	$currentRow = $(this).closest('tr');
	var productId = $currentRow.find('.')
	var leftEnd = $currentRow.find('.fel').html();
	//console.log('Left End = ' + leftEnd);
	$editLine.find('.inputFEL').val(leftEnd);
	var rightEnd = $currentRow.find('.fer').html()
	$editLine.find('.inputFER').val(rightEnd);
	var hinge = $currentRow.find('.hinge').html();
	$editLine.find('.inputHinge').val(hinge);
		
});

//Submit Edit		
$('#orderLinesTable').on('submit', '.edit-line-form', function(e) {
		
	e.preventDefault();
	
	$myButton = $(this);
	$line = $(this).closest('tr');
	$note = $(this).closest('tr').next();
	var lineId = $line.find('.product-select').val();
	var noteContent = $note.find('note-line').val()
	
	var result = '';
	$line.find(':input').each(function() {
		result += $(this).attr('name')+'='+$(this).val()+'&'
	});
	$note.find(':input').each(function() {
		result += $(this).attr('name')+'='+$(this).val()+'&'
	});
	
	var actionUrl = $(this).attr('action');
	$originalEntry = $(this).closest('tr').prev().prev();
	
	console.log(result);
	console.log(lineId);
	console.log(actionUrl);
	
	$line.toggle();
	$note.toggle();
	
	$.ajax({
		url: actionUrl,
		data: result,
		type: 'PUT',
		originalItem: $originalEntry,
		success: function(data) {
			console.log(data);
			this.originalItem.html(`
					<td>
						${data.product.cabtype.code}${data.product.configuration}<br>
						LineId: ${data._id}<br>
						ProductId: ${data.product._id}<br>
						Jquery Edit
					</td>
					<td>${data.product.title}</td>
					<td>${data.quantity}</td>
					<td class="hinge">${data.hinging}</td>
					<td class="fel">${data.fin_left}</td>
					<td class="fer">${data.fin_right}</td>
					<td>${data.width}</td>
					<td>${data.height}</td>
					<td>${data.depth}</td>
					<td></td>
					<td>
						<button type="button" class="btn btn-primary mb-1 edit-button">Edit</button>
						<form class="delete-line-form" id="delete-line-form" name="delete-line-form" action=` + actionUrl + ` method="POST">
							<button type="submit" class="btn btn-primary mb-1">Delete</button>
						</form>
						<button type="button" class="toggle-mod btn btn-primary">Accessory/Mod</button>
					</td>
			`);
			var notes = `${data.notes}`;
			console.log(notes);
			if(!notes){
				console.log('This line does not have any notes!');
			} else {
				this.originalItem.next().css('display', 'table-row');
				this.originalItem.next().html(`
					<td></td>
					<td>Notes:</td>
					<td colspan="7" class="notes">${data.notes}</td>
					<td colspan="2"></td>
				`);
			};
		}
	});
});
						
// Delete Line
$('#orderLinesTable').on('submit', '.delete-line-form', function(e) {
	e.preventDefault();
	var confirmResponse = confirm('Are you sure?');
	if(confirmResponse) {
		var actionUrl = $(this).attr('action');
		console.log(actionUrl);
		$itemToDelete = $(this).closest('tr');
		$itemToDelete.next('.mod-line').css('background-color', 'yellow');
		$noteToDelete = $(this).closest('tr').next();
			$.ajax({
				url: actionUrl,
				type: 'DELETE',
				itemToDelete: $itemToDelete,
				success: function(data) {
					if(data.sublines){
						for(i = 0; i < data.sublines.length; i++) {
							console.log(data.sublines[i]);
							$(this).next('.mod-line').css('background', 'yellow');
						}
					} else {
						console.log('There are not sublines!');
					}
					if(data.notes) {
						console.log('This is the note: ' + data.notes);
						this.itemToDelete.next().remove();
					} else {
						console.log('There are no notes!');
					}
					console.log(data);
					console.log(data.sublines.length)
					this.itemToDelete.remove();
					window.location.reload(true);
					
			}
		});
	};
});

//Add Subline
$('#orderLinesTable').on('submit', '.add-mod-form', function(e) {
						
		e.preventDefault();
	
		$line = $(this).closest('tr');
		$note = $(this).closest('tr').next();
						
		var projectId = `${order.project}`;
		var roomId = `${order.room}`;
		var orderId = `${order._id}`;
		var lineId = $line.find('.lineId').html();
		console.log(lineId);
		var url = '/projects/' + projectId + '/rooms/' + roomId + '/orders/' + orderId +'/lines/' + lineId + '/sublines/';
		console.log(url);
	
		var result = '';
		$line.find(':input').each(function() {
			result += $(this).attr('name')+'='+$(this).val()+'&'
		});
		$note.find(':input').each(function() {
			result += $(this).attr('name')+'='+$(this).val()+'&'
		});
		console.log(result);
		
		$line.find(':input').each(function() {
			$(this).val('');
		});
		$note.find(':input').each(function() {
			$(this).val('');
		});
		
		$.post(url, result, function(data) {
			console.log(data);
			updateUrl = url + `${data._id}`;
			var editSubline = `
					<tr class="edit-mod-line">
						<td>
							<i>Modification/Accessory:</i><br>
							ProductId: <span class="productId"><%= subline.product._id %></span><br>	
							SublineId: <span class="sublineId"><%= subline._id %></span>
						</td>
						<td>
							<select name="product" class="product-select">
								<% products.forEach(function(product) { %>
									<option value="<%= product._id %>"><%= product.cabtype.code %><%= product.configuration %>-<%= product.title %></option>
								<% }) %>
							</select>
						</td>
						<td><input type="number" id="inputModQuantity" name="quantity" step="1" required /></td>
						<td></td>
						<td></td>
						<td></td>
						<td><input id="inputModWidth" type="number" name="width" step="0.25" required /></td>
						<td><input id="inputModHeight" type="number" name="height" step="0.25" required /></td>
						<td><input id="inputModDepth" type="number" name="depth" step="0.25" required /></td>
						<td></td>
						<td>
							<form class="edit-mod-form" id="edit-mod-form" name="edit-mod-form" action=` + updateUrl + ` method="POST">
								<button type="submit" class="btn btn-primary mb-1">Revise</button>
							</form>
						</td>
					</tr>
					<tr class="edit-mod-note-line">
						<td></td>
						<td>Note:</td>
						<td colspan="7"><textarea class="subline-note" name="notes" id="inputModNote" cols="65"></textarea></td>
						<td colspan="2"></td>
					</tr>
			`;
			if(!$.trim(data.notes)) {
				console.log('There are no notes!' + data.notes);
				var notes = "<tr class=\"mod-note-line\"></tr>";
			} else {
				console.log('This is the note: ' + data.notes);
				var notes = `
				<tr class="mod-note-line" style="display: table-row">
					<td></td>
					<td>Notes:</td>
					<td colspan="7" class="notes">${data.notes}</td>
					<td colspan="2"></td>
				</tr>
				`
			};
			var newLine = `<tr class="mod-line">
			 		<td>&nbsp&nbsp+${data.product.cabtype.code}${data.product.configuration}<br>
						ProductId: <span class="product-select">${data.product._id}</span><br>
						SublineId: <span class="sublineId">${data._id}</span><br>
						JQuery Add</br></td>
			 		<td>${data.product.title}</td>
			 		<td><span class="quantity">${data.quantity}</span></td>
			 		<td></td>
			 		<td></td>
			 		<td></td>
			 		<td><span class="width">${data.width}</span></td>
			 		<td><span class="height">${data.height}</span></td>
			 		<td><span class="depth">${data.depth}</span></td>
			 		<td></td>
			 		<td>
			 			<button type="button" class="btn btn-primary mb-1 edit-subline-button">Edit</button>
			 			<form class="delete-subline-form" id="delete-subline-form" name="delete-subline-form" action=` + updateUrl + ` method="POST">
			 				<button type="submit" class="btn btn-primary">Delete</button>
			 			</form>
			 		</td>
			 	</tr>` + notes + editSubline;
			$line.before(newLine);
		});
	});

// Delete Subline
$('#orderLinesTable').on('submit', '.delete-subline-form', function(e) {
	e.preventDefault();
	
	var confirmResponse = confirm('Do you want to remove this subline?');
	if(confirmResponse) {
		var sublineId = $(this).closest('tr').find('.sublineId').html();
		var actionUrl = $(this).attr('action');
		console.log(actionUrl);
		$itemToDelete = $(this).closest('tr');
		$noteToDelete = $(this).closest('tr').next();
		$.ajax({
			url: actionUrl,
			type: 'DELETE',
			itemToDelete: $itemToDelete,
			success: function(data) {
				if(!$.trim(data.notes)) {
					console.log('There are no notes!');
					this.itemToDelete.remove();
				} else {
					console.log('This is the note: ' + data.notes);
					this.itemToDelete.next().remove();
					this.itemToDelete.remove();
				}
				console.log(data);
			}
		});
	};
});
					
// Edit Subline Button
$('#orderLinesTable').on('click', '.edit-subline-button', function(e) {
	//Set the reference lines
	$editLine = $(this).closest('tr').next().next();
	$notesLine = $(this).closest('tr').next().next().next();
	$editLine.toggle('slow');
	$notesLine.toggle('slow');
	$currentRow = $(this).closest('tr');
	//Pull the values from the existing row
	var product = $currentRow.find('.productId').html();
	var quantity = $currentRow.find('.quantity').html();
	var width = $currentRow.find('.width').html();
	var height = $currentRow.find('.height').html();
	var depth = $currentRow.find('.depth').html();
	var note = $currentRow.next().find('.notes').html();
	//Place them as defaults on the edit form
	$editLine.find('.product-select').val(product);
	$editLine.find('#inputModQuantity').val(quantity);
	$editLine.find('#inputModWidth').val(width);
	$editLine.find('#inputModHeight').val(height);
	$editLine.find('#inputModDepth').val(depth);
	$notesLine.find('#inputModNote').val(note);
});
					
// Edit Subline Submission
$('#orderLinesTable').on('submit', '.edit-mod-form', function(e) {
	e.preventDefault();
	
	var actionUrl = $(this).attr('action');
	console.log('Subline edit submit url = ' + actionUrl);
						
	$line = $(this).closest('tr');
	$note = $(this).closest('tr').next();
	$originalEntry = $(this).closest('tr').prev().prev();
						
	var result = '';
	$line.find(':input').each(function() {
		result += $(this).attr('name')+'='+$(this).val()+'&'
	});
	$note.find(':input').each(function() {
		result += $(this).attr('name')+'='+$(this).val()+'&'
	});
	console.log(result);
						
	$line.toggle();
	$note.toggle();
	
	$.ajax({
		url: actionUrl,
		data: result,
		type: 'PUT',
		originalItem: $originalEntry,
		success: function(data) {
			console.log(data);
			this.originalItem.html(`
					<td>&nbsp&nbsp+${data.product.cabtype.code}${data.product.configuration}<br>
						<span class="sublineId">${data._id}</span><br>
						<span class="productId">${data.product._id}</span>
						JQuery Edit</br></td>
					<td>${data.product.title}</td>
					<td><span class="quantity">${data.quantity}</span></td>
					<td></td>
					<td></td>
					<td></td>
					<td><span class="width">${data.width}</span></td>
					<td><span class="height">${data.height}</span></td>
					<td><span class="depth">${data.depth}</span></td>
					<td></td>
					<td>
			 			<button type="button" class="btn btn-primary mb-1 edit-subline-button">Edit</button>
			 			<form class="delete-subline-form" id="delete-subline-form" name="delete-subline-form" action=` + actionUrl + ` method="POST">
			 				<button type="submit" class="btn btn-primary">Delete</button>
			 			</form>
			 		</td>
			`);
			var notes = `${data.notes}`;
			console.log(notes);
			if(!notes){
				console.log('This line does not have any notes!');
			} else {
				this.originalItem.next().css('display', 'table-row');
				this.originalItem.next().html(`
					<td></td>
					<td>Notes:</td>
					<td colspan="7" class="notes">${data.notes}</td>
					<td colspan="2"></td>
				`);
			};
		}
	});
});