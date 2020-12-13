import React, { useState, useRef }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getPosts } from '../../../store/postStore';
import config from '../../../../config';
import io from '../../../utils/socket';

const DashboardHome = () => {

    const dispatch = useDispatch();
    const formRef = useRef();
    const posts = useSelector(state => state.post.posts);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [comment, setComment] = useState('');
    const [postTargetId, setPostTargetId] = useState('');
    const [openPop, setOpenPop] = useState({pop: false, type: ''});

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(formRef.current);
        const body = {
            comment,
            post_id: postTargetId
        }
        api.post(`${openPop.type == 'post' ? 'post/create' : 'comment/create'}`, openPop.type == 'post' ? data : body, openPop.type == 'post' ? {headers: { 'content-type': 'multipart/form-data' }} : {headers: { 'content-type': 'application/json' }})
        .then(res => {
            setTitle('');
            setText('');
            setComment('');
            setPostTargetId('');
            setOpenPop({pop: false, type: ''})
            dispatch(getPosts());
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="centralContainer">
            <h1 className="centerText">Bienvenue sur votre page fastblock</h1>
            {
                posts && posts.length > 0 ?
                posts.map(post => { 
                    return (<div key={post.id.split('-')[0]} className="card">
                        <div className="postHeader">
                            <h2>{post.title}</h2>
                            <div className="litleRoundedAvatar">
                                {post.avatar && <img src={`${config.SERVE_URL}${post.avatar}`} />}
                            </div>
                            <h3>{post.pseudo}</h3>
                        </div>
                        <div className="postBody">
                            {
                                post.medias && post.medias.length > 0 ? (<div className="mediasContainer">{
                                post.medias.map((media) => {
                                return (<div key={media.id.split('-')[0]} className="mediaBlock">
                                {    
                                media.type == 'doc' ? <a href={`${config.SERVE_URL}${media.path}`} target="_blank">{media.path.split('/')[1]}</a>
                                        :
                                media.type == 'image' ? <img src={`${config.SERVE_URL}${media.path}`} /> :  <video width="200" height="200" src={`${config.SERVE_URL}${media.path}`} controls> Your browser does not support the video tag.</video> 
                                }
                                </div>)
                                })}
                                </div>) : <div className="mediasContainer"></div>
                            }
                            <div className="textBlock">
                                    {post.text}
                            </div>
                        </div>
                        <div className="likeThisPost">
                            {
                                post.likes && post.likes.length > 0 && post.likes.map(like => {
                                return (<div key={`${like.pseudo}${post.id.split('-')[0]}`} className="likeCard">
                                            <div className="likeIco">
                                                { like.type == 'like' ? <FontAwesomeIcon className="likeIco" icon={faThumbsUp} /> : <FontAwesomeIcon className="loveIco" icon={faHeart} />}
                                            </div>
                                        </div>)})
                            }
                        </div>
                        <div className="commentThisPost">
                            {
                                post.comments && post.comments.length > 0 && post.comments.map(comment => {
                                return (<div key={comment.id.split('-')[0]} className="commentCard">
                                            <div className="commentHeader">
                                                <div className="litleRoundedAvatar">
                                                    <img src={`${config.SERVE_URL}${comment.avatar}`} />
                                                </div>
                                                <h4>{comment.pseudo}</h4>
                                            </div>
                                            <div className="commentBody">{comment.comment}</div>
                                        </div>)})
                            }
                        </div>
                        <div className="openPopForm" onClick={() => {
                            setPostTargetId(post.id);
                            setOpenPop({pop: true, type: 'comment'})  
                            }}>
                            <FontAwesomeIcon className="popIco" icon={faPlusCircle} />
                        </div>
                    </div>)
                })
                :
                <h2 className="noPosts">Aucun Post n'a été publié</h2>
            }
            {
            openPop.pop && <>
            {openPop.type == 'post' ?
            <form className="fromCardPop" onSubmit={handleSubmit} ref={formRef} >
                <FontAwesomeIcon className="closePop" icon={faTimes} onClick={() => setOpenPop({pop: false, type: ''})}/>
                <h1 className="formHeader">Ajoute ton post</h1>
                <div className="formElement">
                    <label>Media</label>
                    <input type="file" name='medias' multiple />
                </div>
                <div className="formElement">
                    <label>Title</label>
                    <input type="text" onChange={(ev)=> setTitle(ev.target.value)} name='title' value={title} required />
                </div>
                <div className="formElement">
                    <label>Text</label>
                    <input type="richtext" onChange={(ev)=> setText(ev.target.value)} name='text' value={text}></input>
                </div>
                <button type="submit">Envoyer</button><br />
            </form>
            :
            <form className="fromCardPop" onSubmit={handleSubmit} >
                <FontAwesomeIcon className="closePop" icon={faTimes} onClick={() => setOpenPop({pop: false, type: ''})}/>
                <h1 className="formHeader">Ajoute ton commentaire</h1>
                <div className="formElement">
                    <label>Commentaire</label>
                    <input type="text" onChange={(ev)=> setComment(ev.target.value)} name='comment' value={comment} required />
                </div>
                    <input type="hidden" minLength="8" name='post_id' value={postTargetId} />
                <button type="submit">Envoyer</button><br />
            </form>}
            </>
            }
            <div className="openPopForm" onClick={() => setOpenPop({pop: true, type: 'post'}) }>
                <FontAwesomeIcon className="popIco" icon={faPlusCircle} />
            </div>
        </div>
            )
}
export default DashboardHome;