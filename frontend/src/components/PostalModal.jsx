import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import Firebase from "firebase";
import { postArticleAPI } from "../action";

function PostalModal(props) {
	const [editorText, setEditorText] = useState("");
	const [imageFile, setImageFile] = useState("");
	const [videoFile, setVideoFile] = useState("");
	const [assetArea, setAssetArea] = useState("");

	const reset = (event) => {
		setEditorText("");
		setImageFile("");
		setVideoFile("");
		setAssetArea("");
		props.clickHandler(event);
	};

	function handleImage(event) {
		let image = event.target.files[0];

		if (image === "" || image === undefined) {
			alert(`Not an image. This file is: ${typeof imageFile}`);
			return;
		}
		setImageFile(image);
	}

	function switchAssetArea(area) {
		setImageFile("");
		setVideoFile("");
		setAssetArea(area);
	}

	function postArticle(event) {
		event.preventDefault();
		if (event.target !== event.currentTarget) {
			return;
		}

		const payload = {
			image: imageFile,
			video: videoFile,
			description: editorText,
			user: props.user,
			timestamp: Firebase.firestore.Timestamp.now(),
		};

		props.postArticle(payload);
		reset(event);
	}

	return (
		<>
			{props.showModal === "open" && (
				<div className="fixed inset-0 z-[11] bg-black/80 animate-[fadeIn_0.3s_ease]">
					<div className="w-full max-w-[552px] max-h-[90%] bg-white overflow-initial rounded-lg relative flex flex-col top-8 mx-auto">
						<div className="block py-2.5 px-5 border-b border-black/15 text-[20px] leading-[1.5] text-black/90 flex justify-between items-center">
							<h2 className="font-normal text-[20px]">Create a post</h2>
							<button onClick={(event) => reset(event)} className="w-10 h-10 min-w-auto border-none outline-none bg-transparent flex justify-center items-center cursor-pointer">
								<img src="/images/close-icon.svg" alt="" className="pointer-events-none" />
							</button>
						</div>
						<div className="flex flex-col grow overflow-y-auto align-baseline bg-transparent py-1 px-3">
							<div className="flex items-center py-2.5 px-6">
								{props.user.photoURL ? <img src={props.user.photoURL} alt="" className="w-12 h-12 bg-content rounded-full border-2 border-transparent" /> : <img src="/images/user.svg" alt="" className="w-12 h-12 bg-content rounded-full border-2 border-transparent" />}
								<span className="font-semibold text-[16px] leading-[1.5] ml-1">{props.user.displayName ? props.user.displayName : "Name"}</span>
							</div>
							<div className="py-3 px-6">
								<textarea 
									value={editorText} 
									onChange={(event) => setEditorText(event.target.value)} 
									placeholder="What do you want to talk about?" 
									autoFocus={true} 
									className="w-full min-h-[100px] resize-none outline-none text-[16px] border-none"
								/>

								{assetArea === "image" ? (
									<div className="text-center">
										<input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="imageFile" onChange={handleImage} className="hidden" />
										<p className="mb-2">
											<label htmlFor="imageFile" className="cursor-pointer text-[#0a66c2] font-semibold hover:underline">Select an image to share</label>
										</p>
										{imageFile && <img src={URL.createObjectURL(imageFile)} alt="" className="w-full rounded-lg" />}
									</div>
								) : (
									assetArea === "video" && (
										<>
											<input
												type="text"
												name="video"
												id="videoFile"
												value={videoFile}
												placeholder="Enter the video link"
												onChange={(event) => setVideoFile(event.target.value)}
												className="w-full h-[35px] text-[16px] mb-5 border border-black/20 rounded p-2"
											/>
											{videoFile && <ReactPlayer width={"100%"} url={videoFile} />}
										</>
									)
								)}
							</div>
						</div>
						<div className="flex justify-between py-2.5 pr-6 pl-4 border-t border-black/10">
							<div className="flex items-center">
								<button onClick={() => switchAssetArea("image")} className="flex items-center h-10 min-w-auto mr-2 rounded-full border-none outline-none justify-center bg-transparent hover:bg-black/10 w-10 cursor-pointer">
									<img src="/images/share-image.svg" alt="" />
								</button>
								<button onClick={() => switchAssetArea("video")} className="flex items-center h-10 min-w-auto mr-2 rounded-full border-none outline-none justify-center bg-transparent hover:bg-black/10 w-10 cursor-pointer">
									<img src="/images/share-video.svg" alt="" />
								</button>
							</div>
							<div className="pl-2 mr-auto border-l border-black/10 flex items-center">
								<button className="flex items-center h-10 min-w-auto mr-2 border-none outline-none justify-center bg-transparent hover:bg-black/10 rounded-[50px] py-1 px-2.5 cursor-pointer">
									<img src="/images/share-comment.svg" alt="" />
									<span className="text-[16px] font-semibold text-black/60 px-1">Anyone</span>
								</button>
							</div>
							<button 
								disabled={!editorText ? true : false} 
								onClick={(event) => postArticle(event)}
								className={`min-w-[60px] px-4 rounded-[20px] text-[16px] tracking-[1.1px] border-none outline-none transition-colors duration-200 ${!editorText ? 'bg-[#b8b8b8] text-[#5a5a5a] cursor-not-allowed' : 'bg-[#0a66c2] text-white cursor-pointer hover:bg-[#004182]'}`}
							>
								Post
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		postArticle: (payload) => dispatch(postArticleAPI(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostalModal);
