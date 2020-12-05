
export default class Canvas {
    constructor() {
      // ウィンドウサイズ
      this.w = window.innerWidth;
      this.h = window.innerHeight;
  
      // レンダラーを作成
      this.renderer = new THREE.WebGLRenderer({alpha:true, antialias: true });
      this.renderer.setSize(this.w, this.h);// 描画サイズ
      this.renderer.setPixelRatio(window.devicePixelRatio);// ピクセル比
  
      // #canvas-containerにレンダラーのcanvasを追加
      document.body.appendChild( this.renderer.domElement );
  
      // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
      this.camera = new THREE.PerspectiveCamera(60, this.w / this.h, 1, 10);
      this.camera.position.z = 3;// カメラを遠ざける
  
      // シーンを作成
      this.scene = new THREE.Scene();
  
      // ライトを作成
      this.light = new THREE.PointLight(0x00ffff);
      this.light.position.set(2, 2, 2);// ライトの位置を設定
  
      // ライトをシーンに追加
      this.scene.add(this.light);
  
      // 立方体のジオメトリを作成(幅, 高さ, 奥行き)
      const geo = new THREE.BoxGeometry(1, 1, 1);
  
      // マテリアルを作成
      const mat = new THREE.MeshBasicMaterial( {
        map:THREE.ImageUtils.loadTexture('../1200px-Vladimir_Putin_(2020-02-20).jpg', function() {this.renderer.render(scene, camera);})
      } );

  
      // ジオメトリとマテリアルからメッシュを作成
      this.mesh = new THREE.Mesh(geo, mat);
  
      // メッシュをシーンに追加
      this.scene.add(this.mesh);
  
      // 画面に表示

      this.render();
      
    }
    render() {
        // 次のフレームを要求
        requestAnimationFrame(() => { this.render(); });
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
        // 画面に表示
        this.renderer.render(this.scene, this.camera);
      }
  };