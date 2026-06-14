//
//  RotatingBorderModifier.swift
//  AnimatedInput
//
//  Created by Beto on 6/14/26.
//
 
import SwiftUI
import ExpoUI
import ExpoModulesCore
 
@available(iOS 17.0, *)
struct RotatingBorderModifier: ViewModifier, Record {
  @Field var cornerRadius: CGFloat = 25
  @Field var tint: Color = .yellow
  @Field var lineWidth: CGFloat = 3
  @Field var duration: Double = 2.5
  @Field var isActive: Bool = true
 
  @State private var isAnimating: Bool = false
 
  func body(content: Content) -> some View {
    content
      .overlay {
        if isActive {
          let shape = RoundedRectangle(cornerRadius: cornerRadius)
          let clearColors: [Color] = Array(repeating: .clear, count: 4)
 
          shape
            .stroke(
              tint.gradient,
              style: .init(lineWidth: lineWidth, lineCap: .round, lineJoin: .round)
            )
            .mask {
              shape
                .fill(AngularGradient(
                  colors: clearColors + [.white] + clearColors,
                  center: .center,
                  angle: .degrees(isAnimating ? 360 : 0)
                ))
                .animation(
                  .linear(duration: duration).repeatForever(autoreverses: false),
                  value: isAnimating
                )
            }
            .padding(-1.5)
            .blur(radius: 0.2)
            .onAppear { isAnimating = true }
            .onDisappear { isAnimating = false }
        }
      }
  }
}
 
@available(iOS 17.0, *)
extension View {
  func rotatingBorder(
    cornerRadius: CGFloat = 25,
    tint: Color = .yellow,
    lineWidth: CGFloat = 3,
    duration: Double = 2.5,
    isActive: Bool = true
  ) -> some View {
    modifier(RotatingBorderModifier(
      cornerRadius: cornerRadius,
      tint: tint,
      lineWidth: lineWidth,
      duration: duration,
      isActive: isActive
    ))
  }
}
 
